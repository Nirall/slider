# Тестовое задание FSD (slider)


### Установка
В репозитарии имеется собранная тестовая страница с подключенными слайдерами "dist/test.html".

Клонирование репозитория "git clone https://github.com/Nirall/slider".

Установка зависимостей "npm install".

Запуск dev-mode "npm start", хостит "index.html" с тестовым примером.

Прогон тестов "npm run test".

Сборка билда "npm run build".

Для публикации на GitHub Pages добавьте путь до папки 'dist'. Пример - "https://nirall.github.io/slider/dist/".

Инициализация плагина с подключением методов для тестирования выполнена внутри "index.html".

[Тестовая страница](https://nirall.github.io/slider/dist/)

### Архитектура приложения
[UML](https://viewer.diagrams.net/?target=blank&highlight=0000ff&edit=_blank&layers=1&nav=1&title=UML.drawio#R7V1bc9pIE%2F01VPE9sCWJ%2B6OxQ%2BLEt4293uyjDAPIFhKRRLD9678Z3WFagthzsZ2uSu2isbhI50yr%2B3RPT6N9vHz8HNirxbk%2FJW7DMqaPjfZJw7Ksjtmn%2F2MjT8lI3%2BglA%2FPAmSZDZjFw7TyTdNBIR9fOlIRbJ0a%2B70bOantw4nsemURbY3YQ%2BJvt02a%2Bu%2F2tK3tOuIHrie3yo%2F8602iRjpq9YfGHL8SZL7Kv7nU7yV%2BWdnZ2einhwp76m9JQ%2B1OjfRz4fpS8Wj4eE5fdvezG%2FHv69K979tD7%2FPXv8Kf9z%2BjbzcVtK%2Fmw8e%2B8Jb%2BGgHjRiz%2F659H65%2B39eHZ5d7aanZ5ebL6Neq2BlXz2L9tdb9%2BxMHrK7mFEHunXjhbR0qUDJn0ZRoH%2FQI591w%2FoiOd79MzRzHHdnSHbdeYePZzQH07o%2BOgXCSKHonOU%2FmHpTKfsa0abhROR65U9Yd%2B5oVykY4G%2F9qaE%2FXyDHh14E9Kfz76IPJauKL0pn4m%2FJFHwRE9J%2F9pJ4U0JbnXT401Bl%2ByURYkoGSvslKDz%2FIMLDOiLFIbfgMQccpB88%2Fw7DpVw4yxdO7nzvhddp38xD7ntkc%2Fu72ThuNMz%2B8lfs2sKI3vykB2NFn7gPNOPtQvI7SBK57fV2zrjmr0zRSkgIT3nKkPJ3Bk6tx%2B3TjyzwygdmPiua69C5y6%2FjKUdzB1v5EeRv5RMglZusJ4y%2B8XTwBwAPDCHNURIv%2B87tWy2N6cXln9hb4d1Jv91PYh1ve0vs10KsGdHZMTmSsiRL7%2FSl%2FMxI3qJjw1r1Di2GkcGcQlF5ig5%2BHJzfvaJDjBoKkzI79oNl8yiSvqG1Fo43vwsPuekU4x8T%2B8XG%2FLpe2dubLYX1NYQL7YrkR3ZCc8YqVa%2B40XxDe2O6D96vcfGX91Gl%2F7wY3psFsf0Hzs9iI59j16L7cQsJJTEG8KIDPCzfo7vJ%2BjTNvD76LhLkJeYJWN2e%2FJ1%2FNw5u7CPvP%2B%2Bb8z595tWG2QBfVN4m6LDiGAZd%2FTpTmwPGSCaAV1LHQNgQ2ACFNhB2XVi9BKUM4fLfBHEuWuQYnrDID9pmRzubR73NoCxa98R98oPncjx2ecHybk72GuDtz84DN6BLHR5TzA383MSxVg2%2F4fTWjTuA92GvVOLezZhEHrx0JumQpMOYt%2Btxj4sYe%2FPZvQQGSCeAe0Drb40BvSqGbBeTWlg0SwcPCSAeAL0Opq9Ol5tGNkBBzSKDQLFhsF27J9LqiUO5HrAFgc6VjUJDpYaOm9WaTBhpcFCmeGF9kiEygAzUYA12njPs%2Bl60J13LTJ9vL6fPZ%2BQVhUDUGVQQwBAZJBGANAfqREb%2FbuQBPRSwtwUnNsP5DIeZXf58u6eZZCQEmIpAQgT0igBPxZQd5KHrmnwDigIryzdKYuBUX9QDj0gPyie2XBSIcP%2B5JQ6eSGCLwV8QHlQ%2B6SHrDoqD8rwB4QHxZOfF55b7D2eEzUzVw9xF477kA%2F%2F1c57%2FnnfSmb9wvao4zWyg2PXmTw0yS966UgA4SG%2BqTDGf36Yjb%2Fcdu5%2FrK7Gf2%2BMz0d3X1tAiHcTME3vnWuOv6suble35cWFBhjG8GwQVPxmpVY4Y0ebNw%2FtjAlldvQGnWp6VGuRedlcZo4s%2FvtM9XIkaKgGNR4KRcKmn18WI66KIbRZGUtrDcBrZEmQlNKeWUCZbE6FYO15JDindyOnwvd4CGkgmAaAOKmYBjXxakKDo%2Bk0lisSnRrJII8MgCypmAw1hTN3dpDkKaBcaor8u0W0xnFJlwjAyVMxuEOCpTTgYZe7zi8I%2FDl1B8NRRoCr0gASQSgRDnVVpQUyMA8oxMnyIwZ%2FshLpowEvDdKudkevpiIO8496SJE539rmOfSg3wE5zT9yS%2BTKMfwHyTsKCumMA%2F03AXlHeKbvr3wsgnyUIYXjD8iQik19f6%2Bpv3XIZhz4y1ifTARpdgctg9LDRk4I50RHoaWHOcFXw%2BacsFcr4k1v%2FAt%2FSpr0yoMnZIB4oU97VD%2FgGMCykvRCySZRcsLmZB2wC79lp%2BCjQTwJhgojfJAEQz5FleYoJ77HLuQyXhBz48cUaManIQ9E86AN5IYU84CP8Ft5dRJT%2FBOLkLABi5TEM6Cj20kc8omfggGF2I88kMuDvm7HcMhnfraqVhICnNP7nYQJFzRwTEKFRn9UChySLFGjf4IkEU6SoW7fcQhVtMUkWdJ7nFCk6d%2FdI%2Faisc%2FLWPRhzwvHrTwlNCFhmFmIdUg%2BMXuQ2InzZdkuIDGEEwPo5qWYGLzOCBEj9R2SlfbICamc6Gv3KnnpMYsvF2TygIxQXVhkaPcvIdkpqStiSfaEC6kHkcpPl9iUQw4ZLN1%2BZN57sIINieCUmIQwIivkgHAOdLX7k3wmYivgjAtLSgslioAT1Ug5lBjo9iRNo1KOLLkNx64fsjATnw5SaNADmrWopkGlJgmtoCoMAy6oksOItm7nMS%2BJ5RmRVLKUilBRnRZPgK5ChxHu4s6r0weVJr6zFXbvqqsXIDyByyzzhfgftKlXxTIJa7uc1jKOgsCm19xzGXXGa28Sly1avXkxddFm7TUAb7LTF%2FyToUrrHZSxq89L4T20j5esrj4V1bX0m6bTy3TiJx5Kc1asm8ymPfoowgnRO%2FBxJG%2B%2B8wpnsXaSsAQp8kIDL4D244p5UVNy6%2FmRM3u6zB0FC1mhhhVKW4OBMS2fIbtJtg3DIEbpPkhtYGMieB%2Bk3osagrzJfZDgyvBqO4X9ifcaptpJ%2Fn52QYIfVtifWBUBVG6CVKG1AgzAsFUMugr3QILB5TMr2ItWCfLad0Gqa0XLb4WDmXaJXNC%2FLRLQmhR70yokgPZdkUxenK5o44XRp8DocyeFBjWjBFWIvMr7%2FefQYDpWqekPbGPoLPAEd4lGWwRP7DeZKIN%2FMtynwjKiVBCLA84qdQzxfyX%2B2nfEsaomP2oOiiigcgcc%2BCfXaI%2FYlUwPKQ7eOEceKyAxEqUoUfge6nzKEqMsSGlEMUoN9rotvlXTnAzlKMVsULlVDsyGGl0a9SgFDNC%2FaU6NB0gfBvGTHZ8EEqJ%2FlbvlwMjX1EfRW5u1FUHsxWMPtKNUi327xgVk2J8xFxqhlyH66XYA2zWbDIQLf4PQy4Ie6D6pGPoab49BjxZfFvZQx0nF2NeUIWADYhUUAFpOKqZA5WLe7VaD65Cc%2BBsP98mUxQSg6aRiJlT2lOOYUHSeRCaIZwLQWVIxEyqbyHFM%2BGeFPJDEA6jLpGIeDDlUyXROsqojelMW%2Fpw1JP5UjO5s01Wcc%2BbHGRyWwLknUfSUlhXZ68hvbG1lQx6d6Efp9X%2FsoygYydFJVksUHzxlB8w%2F%2BVE%2BKL2LHRZvi4%2BK902PgiDmytSxlz51eBZsZ032h7HjZj%2BJx7iuAin018GE1NzXdH5HdjAntZxJZXl202sZExDXjpxf5ZMk0KHD6wMmR5B02nNbEx1uASoL2PKU4GbhROSaznz2nZvAXnG0%2Bz3ADi8Zy25BFr0BXZo60AytKRh7HSR83F63BSCWDwrkwk754LB%2FaAsOIUvX3m75YKZjchVEuG7tZa5D53BqvpUqwg4sLGAVmTIKaC8k7GDHFYnwHlokKKtcqFuXMOAqRjA6FE4AlZ00YAbU5Q1IdHJKH%2B0ho8DUSV8hC4SzQH%2FnjE5NqQgWCylggPbiwS6fQTi3gwcOagw%2BBQafXOcU0wR6bsHLGIcfO%2F7swpuqY%2Fz5UqOUT%2FD30zili6uYNFNAe%2BuUXlUn2HSAoe%2Btl3fAKmsE%2F5XgH9pZRd7837%2FbOi5hU0wKaAmbYlZAsQpKUqLwBZawKe2n1K2pXcclbJKx123xe7DXj0vYdLABWMKmmA31q1kLcRLRF48%2BsHxNMfo1yQnUJBWE%2F8AyNsUM4JMTLfYez4mamf%2BPwIsHHljDphh4vvBgq3SVKdPJdmUIvwTZT7sXyOt%2B8daVHNaYjBCYjBgckIqAc1IfPBXRq5GhKAw2%2FfyyDnVVDKFtqrVN%2BTx%2FPyVxvZpEOZ2rDwUNtvYmS1KpuC%2BZHFZor5Lr16zARKFaDym0N%2BDrYas1ifAe3EpPlk6drfSskScK5wDDFPEE0F4016%2BRJ9nedOyhH2KEKgF67dVy%2FZpm%2F9hyQQUFtPfX60ML7VGclA689rZ6%2FT3r6mOpKlEn40X1mKWUqghob7bX5%2BUhZggmAaE%2BIPoAsnDX3mivz0tBDPd4CTsiLkP70%2B71YScNKZ00sjrvva00Mga8kVYaAz4A7FbN%2Bz%2BjlYZpGZp7aZhGDyepjEmatbHZO0kH1puapKbB%2B2e8EPuxZ2l7d5M0oMuJ4lk6wFn6yln682j98%2FZ%2BPLu8O1vNTk8vNt9GvXyr4f2ztCN6lsZvTbOe%2BQmpY1l88hUbKDFzZwFkP204MT7w%2FHanv0PG5BcILQAwDT6V86f1zGpnhKlpe6vWhGRMQBMi9kGfBdZlEwLamqH5NkxIe8cHNdLpWmlDdt7QTtP3cm2IyZcz%2F%2FE2pKvdhvCeINoQATakBwQLzw%2Bz8Zfbzv2P1dX4743x%2Bejua6sl3IS8kg98Ic8fP0l1d8c0gZ3Vbx2y4XDBamCBNBgYOyFjtsNEWX3tAjxo1xHhA1QDm1ZN7h%2FLgV%2FTXNsU0aIEJKW8%2FVQrdtrG0k%2BdtIAKghXTAq4OobeBPRjizdfjl4i9aOyhul%2FF2GODCpkAg5W%2FEMKyKn9Ni68A2i39DezNFVb%2FymQBVP6reJ7X7bIZl4LFNv6W%2FfmYDlDXfV4uCaNEsZEaEqgBlQerpUbFVtxW5hLSm0LxdV0SjAN%2FyaJZJIYCYkBFw4qJYYF%2BIVYNy4YeKhtWDD2fAGglhw5zGeg9mTlzdBykSwZQwbBiJlS2t5gsyOThOiKrZkj%2Fg%2FBLgB%2BqG1YMP1Q4XMB%2Fbj%2FGLmNzmb5AGsgQDvX7iHz4sEUDx0tpkL5AGkigAbRxt1oaZMUI5cb7%2FpS4HNqY3opvg5z0VvdQ%2FzAPLj9qeqtd03Zvsg4YELE5ChMZ%2B3hrCC1UvYXKJ%2Fs7ynBliV%2FMcL0hWujPcAFbznM4Y5bjxQAfmsaSluQANpIvt2LesvvN7QcDnSfJaXGZ2OUsE78b7TE6seKpAm0ip9gW7C%2BC2Fa8Yw93V%2FJGekihxxvIlHX4Z0XBBwx0ZAY6prlT7Q4W8vVBOnzwSKcDN274xWpL49gGrDJFg1Qxt18V0sAElGWPgNbyDPllrLvE0MMSDGL%2FWuyhuEUt9p2a4h0MZzXRAop2FNMCi%2FZkAgwW7UEIS4tnOzXVWli0p4gFUCii%2BNFfo2aGBNQzkAkSmADV6KllQhYCQ0ygF0w22MRLBvBQDZ5i4HkTkNfgYb9WWbhDCVbFuENRX6lam4X7mVSdlF7EAuUFdQiwLleqIACV5Cl2C%2FbtOMX0gGviTTNuhEgOReSACvYUG44%2Bhyt2iWjsFan3dokYpJNub7OqfDml5lYz%2Fe62uN22VHSOATa8%2FtOaUvR3sgpt7W0msx%2BENkGsTegeahJ6oi3CK%2FnQQT5IaTuatdvYz4gsn%2FdmKMFX0Pxpdts0hjvZZ%2B0tv7LG4%2B9ooraMvwyjvz1bB8Ph3vlKj65I4MR6tt5JnBUVH2DW31hHMGDzT5zE8lqC0cPA96OyB00vdZGk49uf%2Fg8%3D)

Приложение построено на MVC архитектуре (View - пассивный, связей с другими слоями не имеет).

#### Структура View
Графические элементы представлены отдельными классами (Knob, Label, Runner и т.д.) и входят в состав класса Track, который  осуществляет позиционирование и компоновку элементов. View выполняет связь с Controller'ом, осуществляет валидацию значений, введеных с панели слайдера, управляет входящим в её состав Track'ом.

#### Структура Model
Модель представлена классом Model, отвечает за хранение минимального и максимального значения диапазона, выставленного слайдером.

#### Структура Controller
Реализован классом Controller, Модель и Представление входят в состав класса под соответствующими свойствами. Выполняет управляющую роль, реализует методы для JQuery плагина.

#### Реализация MVC
Модель и Представление связаны с Контроллером через шаблон Наблюдатель. Все изменения параметров слайдера вызывают соответствующие уведомления обсерверов. Связь между Track и Представлением, а также отдельные методы взаимодействия между графическими элементами также выполнены через шаблон Наблюдатель.

#### Общая схема взаимодействия слоев
Выполняется первоначальная инициализация по переданным параметрам, либо по параметрам по умолчанию.
При изменении ползунка слайдера мышью, обрабатывается смещение ползунка с учетом выставленного шага и различных граничных условий. Результатом является окончательное смещение ползунка, удовлетворяющее всем условиям, и соответствующее этому смещение значение слайдера. Данное значение через Контроллер пробрасывается в Модель, где выполняется его хранение.
При изменении выставленных значений слайдера через панель управления, данные значения передаются в Представление, где происходит валидация этих значений и передача их в подсистему Track. В Track'e эти значения корректируются с учетом всех граничных условий и выставленного шага слайдера. В результате ползунки занимают откорректированные положения и соотвествующие им значения через Контроллер пробрасываются в Модель.
При изменении конфигурации слайдера через панель управления Представление перерисовывается, выставленные при этом значении сбрасываются. После перерисовки текущие значения, хранящиеся в Модели, через Контроллер пробрасываются в Представление. По этим значениям обновляются положения ползунков.





