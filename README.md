# Тестовое задание FSD (slider)


### Установка
В репозитарии имеется собранная тестовая страница с подключенными слайдерами "dist/test.html". Для установки клонируйте репозиторий, из папки проекта выполните "npm install", тесты "npm run test", сборка "npm run build".

[Тестовая страница](https://nirall.github.io/slider/dist/)

### Архитектура приложения

Приложение построено на MVC архитектуре (View - пассивный, связей с другими слоями не имеет).

#### Структура View
Графические элементы представлены отдельными классами (Scale, Button, и т.д.) и входят в состав класса View. Классы элементов имеют в своем составе непосредственно сам HTML-элемент и вспомогательные методы для их позиционирования. Т.к. для позиционирования элемента требуется информация о других элементах и их состоянии, то обработка событий и логика размещения элементов осуществляется классом View.

Обрабатываемые события:
- Клик по кнопкам (кружкам) слайдера - button1(2).elem.onmousedown;
- Клик по слайдеру - scale.elem.onclick;
- Клик по меткам шкалы - graduation.mark1(2,3,4).onclick.

##### Клик по кнопкам (кружкам) слайдера.
При событии button1(2).elem.onmousedown навешиваются обработчики "mousemove" и "mouseup" на document.
Обрабочик "mousemove" (onMouseMove1(2)) получает смещение соотвествующей кнопки(кружка) относительно начала шкалы, далее передает в метод butt1(2)OffsetCheck для проверки смещения на граничные условия (конец, начало шкалы слайдера, наличие второй кнопки(кружка) на пути следования, смещение меньше шага слайдера). Если граничные условия (конец, начало шкалы слайдера) достигнуты, возращаемое событие содержит кроме смещения еще и значение roundValue. В этом случае данные передаются непосредственно на метод двигающий кнопки butt1(2)Move. Если граничные условия не достигнуты, то смещение сначала передается в метод roundOffsetButt для округления согласно шагу слайдера, далее на метод, двигающий кнопку.

Событие "mouseup" удаляет навешанные на document обработчики "mousemove" и "mouseup".

##### Клик по слайдеру.
Обработчик определяет какая кнопка ближе (если включен диапазон - ".range"), потом передает событие обработчику "mousemove" (onMouseMove1(2))соответствующей кнопки.

##### Клик по меткам шкалы.
Клик по крайним меткам - mark1, mark4 вызывает метод двигающий кнопки butt1(2)Move, клик по промежуточным меткам - mark2, mark3 вызывает метод interMarkHandler, определяющий какая кнопка ближе и далее вызывающий соответствующий butt1(2)Move.

Метод init() выполняет инициализацию слайдера, с выставленными свойствами. Метод append() подключает слайдер к переданному HTML элементу.
Методы: getStart(), getEnd(), offsetValueConv(), updateElems(), round() - вспомогательные, часть из них задействована для реализации шаблона "наблюдатель" (подробности далее по тексту).

#### Структура Model
Модель представлена классом Model, содержащим информацию только для бизнес-логики - минимальное и максимальное значение диапазона, выставленного слайдером. Имеет методы setCurMinValue, setCurMaxValue для выставления соответствующих значений.

#### Структура Controller
Реализован классом Controller, Модель и Представление входят в состав класса под соответствующими свойствами.
Выполняет управляющую роль, реализует методы для Jquery плагина.
Для создания API Jquery плагина содержит следующие методы:
- append - подключает экземпляр класса к соответствующему Jquery объекту;
- update - обновляет слайдер согласно изменившимся настройкам. Внутри повторно инициализирует Представление, двигает кнопки для сохранения выставленных значений при переключении вида с горизонтального на вертикальный и наоборот;
- getValues и setValues для получения и выставления значений слайдера напрямую (особенности метода setValues ниже по тексту);
- getConfig - возвращает текущие настройки слайдера;
- addObserver - добавляет к Контроллеру наблюдателя. Метод нужен только для получения значений слайдера в реальном времени.

#### Реализация MVC
Слои разделены и не имеют между собой зависимостей, за исключением слоя Controller. Отслеживание изменений выполнено при помощи шаблона Наблюдатель (класс MakeObservableObject) и реализовано следующим образом:

##### Представление
Все действия пользователя при изменении диапазона значений слайдера заканчиваются передвижением кнопок(кружочков) слайдера. Передвижение кнопок выполняется при помощи 2-х методов - butt1Move, butt2Move. При их вызове в экземпляре класса View для удобства выставляются значение свойств curMinValue, curMaxValue и вызывается метод updateElems. UpdateElems в свою очередь обновляет прогресс бар (заполнение) слайдера, изменяет выставленное нижнее значение (curMinValue) в минимальное значение шкалы (MinValue), если выключили диапазон (.range),  и вызывает метод уведомления набюдателей.

##### Модель
Уведомление наблюдателей осуществляется при вызове методов setCurMinValue, setCurMaxValue, выполняющих в свою очередь изменение выставленных значений диапазона.

##### Контроллер
Наблюдатели добавляются в конструкторе класа Controller. В Представлении наблюдатель считывает значения curMinValue, curMaxValue и выставляет соответствующие значения Модели напрямую. В Модели наблюдатель считывает текущие значения curMinValue, curMaxValue и передает напрямую в методы движения кнопок (butt1(2)Move) минуя проверку смещения (butt1(2)OffsetCheck). Эта способ реализации применен для возможности выставления точного значения несмотря на выставленный шаг слайдера, но может привести к багам при попытках выставить некорректные значения (curMaxValue > maxValue, curMaxValue < curMinValue и т.д.).
