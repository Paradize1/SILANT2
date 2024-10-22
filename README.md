Запуск проекта

1) Перейдите в папку backend и запустите сервер
cd backend
python -m venv venv
venv/scripts/activate
pip install -r requirements.txt
cd silant
python manage.py runserver

2) Откройте вторую консоль и запустите фронт
cd react-intro
npm install
npm start


данные для входа:
klient1   20001222Aaqqq     
manager1   20001222Aaqqq    
company1   20001222Aaqqq   

панель админа:
admin       admin



О заказчике и проекте
Ваш заказчик — Чебоксарский завод силовых агрегатов (ЧЗСА). Этот завод выпускает компоненты к дорожно-строительной технике. Например, охлаждающие системы для двигателей тракторов или детали ходовой части. В общем, ЧЗСА — это настоящее матёрое производство.

В 2021 году завод начал выпускать свои вилочные погрузчики. Бренд назвали «Силант». Для этого бренда вам и предстоит выполнять проект.

О сервисе, который нужно реализовать
Те, кто покупает погрузчики, должны их обслуживать. У всех деталей есть свой срок службы, и их важно вовремя менять. Если не заменить деталь вовремя, погрузчик может сломаться и предприятие, которое его использует, частично остановится и будет терять деньги.

При этом следить за заменой деталей — непростая задача. Их много, срок у них разный. Можно попросту забыть что-то поменять. Поэтому ЧЗСА решили помочь своим клиентам решить эту проблему.

Они решили разработать сервис, в котором можно было бы отслеживать состояние каждой купленной машины и всех её комплектующих. Так любой, кто купил погрузчик «Силант» может войти на сайт под своим профилем, и понять, каким машинам в скором времени нужно обслуживание.

Кроме того, сервис решили добавить возможность отслеживать, как идёт обслуживание техники. Так можно понять, когда очередной погрузчик выйдет из сервиса и вернётся в строй.

Требования к сервису
Сервис должен хранить следующие данные о складской технике «Силант»:

комплектация погрузчика;
место использования;
истории обслуживания, поломок и ремонта.
В сервисе должна быть реализована авторизация, в том числе различные роли: гость, клиент, сервисная организация и менеджер. У каждой роли должен быть настроен свой уровень доступа к просмотру и редактированию данных.

Кто будет пользоваться сервисом
Целевая аудитория сервиса — это все, кто имеют отношение к работе с погрузчиками. А именно:

эксплуатанты техники: те, кто покупают технику;
сервисные организации: те, кто её чинят;
представители производителя техники: те, кто производят технику, то есть сами ЧЗСА.
Для каждого типа пользователей нужно будет реализовать свои функции и свой интерфейс взаимодействия.

