const generateEmailTemplate = (tariff: "base" | "premium" | "optimal") => {
  let bonusContent = `
        <div class="lesson">
            <div class="lesson-text">
                <div class="lesson-num">Памятка</div>
                <div class="lesson-title">Памятка по курсу</div>
                <div class="lesson-desc">Краткое руководство по всем техникам из курса</div>
            </div>
            <a href="#" class="lesson-link">Открыть</a>
        </div>
    `;

  if (tariff === "base") {
    bonusContent += `
        <div class="lesson">
            <div class="lesson-text">
                <div class="lesson-num">Медитация</div>
                <div class="lesson-title">Аудиомедитация (релакс)</div>
                <div class="lesson-desc">Расслабляющая медитация для снятия стресса</div>
            </div>
            <a href="#" class="lesson-link">Слушать</a>
        </div>
        `;
  }

  if (tariff !== "base") {
    bonusContent += `
        <div class="lesson">
            <div class="lesson-text">
                <div class="lesson-num">Групповой чат</div>
                <div class="lesson-title">Обмен опытом</div>
                <div class="lesson-desc">Общайтесь с другими участниками курса и делитесь результатами</div>
            </div>
            <a href="#" class="lesson-link">Вступить</a>
        </div>
        <div class="lesson">
            <div class="lesson-text">
                <div class="lesson-num">Медитация</div>
                <div class="lesson-title">Аудиомедитация (релакс)</div>
                <div class="lesson-desc">Расслабляющая медитация для снятия стресса</div>
            </div>
            <a href="#" class="lesson-link">Слушать</a>
        </div>
        <div class="lesson">
            <div class="lesson-text">
                <div class="lesson-num">Медитация</div>
                <div class="lesson-title">Аудиомедитация (мотивация)</div>
                <div class="lesson-desc">Заряжающая медитация на продуктивный день</div>
            </div>
            <a href="#" class="lesson-link">Слушать</a>
        </div>
        <div class="lesson">
            <div class="lesson-text">
                <div class="lesson-num">Медитация</div>
                <div class="lesson-title">Аудиомедитация (уверенность)</div>
                <div class="lesson-desc">Медитация для повышения уверенности в себе</div>
            </div>
            <a href="#" class="lesson-link">Слушать</a>
        </div>
        `;
  }

  if (tariff === "premium") {
    bonusContent += `
        <div class="lesson" style="background-color: #2a2a2a; border-left: 4px solid #EDB834;">
            <div class="lesson-text">
                <div class="lesson-num">Личные сессии</div>
                <div class="lesson-title">8 персональных онлайн-сессий с автором</div>
                <div class="lesson-desc">Автор скоро свяжется с вами для согласования времени.</div>
            </div>
        </div>
        `;
  }

  return `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Курс по невербальному программированию - ИNTEGRAAL</title>
    <style>
    body{font-family:Arial,sans-serif;font-size:16px;color:#b0b0b0;background-color:#0d0d0d;margin:0;padding:0}
    table{border-collapse:collapse;width:100%}
    .container{max-width:600px;margin:20px auto;background-color:#121212;border-radius:12px;overflow:hidden}
    .header{background-color:#1a1a1a;padding:30px 20px;text-align:center}
    .logo{height:50px;vertical-align:middle}
    .title{font-size:28px;font-weight:700;color:#fff;margin:10px 0 0 15px;display:inline-block;vertical-align:middle}
    .accent{color:#EDB834}
    .content{padding:40px 30px}
    .course-title{font-size:28px;text-transform:uppercase;font-weight:700;color:#fff;text-align:center;margin-bottom:15px}
    .subtitle{font-size:18px;color:#a200ff;text-align:center;margin-bottom:30px;font-weight:600}
    .description{font-size:15px;color:#b0b0b0;text-align:center;margin-bottom:35px;line-height:1.6}
    .badge{background-color:#EDB834;border-radius:20px;padding:12px 25px;text-align:center;margin:30px auto;display:table;color:#000;font-weight:700;font-size:15px}
    .lessons{margin-top:40px}
    .bonus-section{margin-top:40px;padding-top:30px;border-top:1px solid #2a2a2a}
    .lessons-title{font-size:22px;color:#fff;text-align:center;margin-bottom:30px;font-weight:700}
    .lesson{background-color:#181818;border-radius:10px;padding:20px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;gap:20px}
    .lesson-text{flex-grow:1}
    .lesson-num{font-size:13px;color:rgb(107,52,237);font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px}
    .lesson-title{font-size:18px;color:#fff;font-weight:600;margin-bottom:10px}
    .lesson-desc{font-size:14px;color:#a0a0a0;line-height:1.5}
    .lesson-link{display:inline-block;background-color:#EDB834;color:#000;text-transform:uppercase;padding:10px 18px;border-radius:20px;text-decoration:none;font-size:14px;font-weight:700;flex-shrink:0}
    .cta{text-align:center;margin:40px 0}
    .cta-btn{display:inline-block;background-color:#EDB834;color:#000;padding:16px 30px;border-radius:20px;text-decoration:none;font-weight:700;font-size:16px}
    .footer{background-color:#1a1a1a;padding:30px 20px;text-align:center;border-top:1px solid #2a2a2a}
    .footer-logo{height:35px;margin-bottom:20px}
    .contacts{font-size:12px;color:#a0a0a0;margin-bottom:20px;line-height:1.6}
    .social{margin:20px 0}
    .social a{display:inline-block;padding:10px 15px;background-color:#3e3e3e;border-radius:25px;margin:0 8px;color:#fff;text-decoration:none;font-size:12px;font-weight:600}
    .website{color:#EDB834;text-decoration:none;font-weight:700}
    @media (max-width:620px){
    .container{margin:0 auto;border-radius:0;border:none;max-width:100%}
    .content{padding:30px 20px}
    .title{font-size:26px}
    .course-title{font-size:24px}
    .subtitle{font-size:17px}
    .description{font-size:14px}
    .lesson{padding:20px;flex-direction:column}
    .cta-btn{padding:15px 25px;font-size:15px}
    }
    </style>
</head>
 <body>
     <div class="container">
         <div class="header">
             <img src="https://alexandrvasilev.ru/_next/static/media/logo_dark.20228596.webp" alt="ИNTEGRAAL" class="logo">
             <span class="title"><span class="accent">ИN</span>TEGRAAL</span>
         </div>

         <div class="content">
             <h1 class="course-title">Курс по невербальному программированию</h1>
             <p class="subtitle">Управляй эмоциями через тело легко</p>
             
             <p class="description">
                 Методика, основанная на простых, но точных движениях, которые влияют на эмоциональное состояние.<br><br>
                 Это работает быстрее, чем медитации, психологи и аффирмации — потому что воздействует напрямую на нейронные паттерны через тело.
             </p>

             <div class="badge">
                 <strong>16 видеоуроков</strong>
             </div>

             <div class="lessons">
                 <h2 class="lessons-title">Содержание курса</h2>
                 
                 <div class="lesson">
                     <div class="lesson-text">
                         <div class="lesson-num">Введение</div>
                         <div class="lesson-title">Вступительный урок и знакомство с курсом</div>
                         <div class="lesson-desc">Основы методики и принципы работы с телом</div>
                     </div>
                     <a href="https://youtube.com/shorts/v3lTJE_Qx8g?si=BhZr3l2Yt8PSXQJL" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-text">
                         <div class="lesson-num">Урок 1</div>
                         <div class="lesson-title">Избавление от суеты</div>
                         <div class="lesson-desc">Прием избавления от суеты через тело</div>
                     </div>
                     <a href="https://youtube.com/shorts/1z7Ptw1y88g?si=goulin9zMEOH_kxz" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-text">
                         <div class="lesson-num">Урок 2</div>
                         <div class="lesson-title">Отключаем стыд</div>
                         <div class="lesson-desc">Техника избавления от чувства стыда</div>
                     </div>
                     <a href="https://youtube.com/shorts/mA4oE94ESJU?si=Rtro56lsK3UF7Ea3" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-text">
                         <div class="lesson-num">Урок 3</div>
                         <div class="lesson-title">Отпускаем чувство обиды</div>
                         <div class="lesson-desc">Как убрать чувство обиды и перестать обижаться на других</div>
                     </div>
                     <a href="https://youtube.com/shorts/-TU2cuE7pqY?si=HyVULCEsimnRW4jz" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-text">
                         <div class="lesson-num">Урок 4</div>
                         <div class="lesson-title">Убираем гнев</div>
                         <div class="lesson-desc">Нивелируем состояние гнева</div>
                     </div>
                     <a href="https://youtube.com/shorts/qMW4NCv6y6U?si=1DmYMMWDeHABmM-2" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-text">
                         <div class="lesson-num">Урок 5</div>
                         <div class="lesson-title">Гасим похоть</div>
                         <div class="lesson-desc">Приглушаем похоть и не даем ей выражаться</div>
                     </div>
                     <a href="https://youtube.com/shorts/_rHh4Ts2qsM?si=tubxLzfYuPPsVGSc" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-text">
                         <div class="lesson-num">Урок 6</div>
                         <div class="lesson-title">Сдерживаем смех</div>
                         <div class="lesson-desc">Техника сдерживания смеха в неуместных ситуациях</div>
                     </div>
                     <a href="https://youtube.com/shorts/p12aUCMOQB0?si=wMhN5GDriFb1sVXx" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-text">
                         <div class="lesson-num">Урок 7</div>
                         <div class="lesson-title">Сбрасываем стресс</div>
                         <div class="lesson-desc">Освобождаемся от его влияния</div>
                     </div>
                     <a href="https://youtube.com/shorts/thacmW7EfhM?si=zDW6SrYBUS6oCoIC" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-text">
                         <div class="lesson-num">Урок 8</div>
                         <div class="lesson-title">Нейтрализуем тревожность</div>
                         <div class="lesson-desc">Снижаем мгновенно тревожность</div>
                     </div>
                     <a href="https://youtube.com/shorts/2LZGECx0gnI?si=5cgZ4djvGi1Sqr3-" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-text">
                         <div class="lesson-num">Урок 9</div>
                         <div class="lesson-title">Отбиваемся от уныния</div>
                         <div class="lesson-desc">Снижаем уныние и перестаем его испытывать</div>
                     </div>
                     <a href="https://youtube.com/shorts/p82tXgMT7rM?si=dRsnzukShoGC0lZK" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-text">
                         <div class="lesson-num">Урок 10</div>
                         <div class="lesson-title">Отбрасываем сомнения</div>
                         <div class="lesson-desc">Отбрасываем мысли сеющие сомнения</div>
                     </div>
                     <a href="https://youtube.com/shorts/DsjDsyjqNVA?si=6pxLSSGeJyfflTpF" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-text">
                         <div class="lesson-num">Урок 11</div>
                         <div class="lesson-title">Отключаем страх</div>
                         <div class="lesson-desc">Освобождаемся от страха и перестаем его испытывать</div>
                     </div>
                     <a href="https://youtube.com/shorts/oQQtcxts56w?si=IaPUwT9NSNam6Xf0" class="lesson-link">Смотреть урок</a>
                 </div>

                <div class="lesson">
                     <div class="lesson-text">
                        <div class="lesson-num">Урок 12</div>
                        <div class="lesson-title">Нивелируем раздражительность</div>
                        <div class="lesson-desc">Избавляемся от раздражительности в моменте</div>
                    </div>
                     <a href="https://youtube.com/shorts/hDGu65v5eDM?si=Jt6bKMBMqgiZGefV" class="lesson-link">Смотреть урок</a>
                 </div>

                <div class="lesson">
                     <div class="lesson-text">
                        <div class="lesson-num">Урок 13</div>
                        <div class="lesson-title">Максимальная концентрация</div>
                        <div class="lesson-desc">Повышаем концентрацию и сосредоточенность</div>
                    </div>
                     <a href="https://youtube.com/shorts/BqWI_M6Ft4Q?si=gNvQn3SZKObBS7ls" class="lesson-link">Смотреть урок</a>
                 </div>

                <div class="lesson">
                    <div class="lesson-text">
                        <div class="lesson-num">Урок 14</div>
                        <div class="lesson-title">Активируем терпение</div>
                        <div class="lesson-desc">Повышаем терпение и выдержку</div>
                    </div>
                     <a href="https://youtube.com/shorts/GXeuZw1R-f4?si=3VOw46-NDRqT-z-L" class="lesson-link">Смотреть урок</a>
                 </div>

                <div class="lesson">
                    <div class="lesson-text">
                        <div class="lesson-num">Заключительный урок</div>
                        <div class="lesson-title">Как применять методику в повседневной жизни</div>
                        <div class="lesson-desc">Делать это незаметно для окружающих</div>
                    </div>
                     <a href="https://youtube.com/shorts/YrLrtvI9ta4?si=0yM4N_L55O-HDAwy" class="lesson-link">Смотреть урок</a>
                 </div>
             </div>

            <div class="cta">
                 <a href="https://youtube.com/playlist?list=PL4i_yzJP13U0EhEfDSUOa2_g5HG9Lwfda&si=hQrj-qta0sV-Ktgc" class="cta-btn">
                     Весь плейлист
                 </a>
             </div>

            <div class="bonus-section">
                <h2 class="lessons-title">Дополнительные материалы</h2>
                ${bonusContent}
            </div>
         </div>

         <div class="footer">
             <img src="https://alexandrvasilev.ru/_next/static/media/logo_dark.20228596.webp" alt="ИNTEGRAAL" class="footer-logo">
             
             <div class="contacts">
                 <strong>Контакты для связи:</strong><br>
                 Telegram: @z44lp<br>
                 Email: z44lp.hero@ya.ru<br>
                 ИНН: 164705996614<br>
                 Адрес: г. Казань, ул. Туфана Миннуллина, 10А
             </div>

             <div class="social">
                 <a href="https://t.me/chronics44" title="Telegram">Telegram</a>
                 <a href="https://youtube.com/@alexandrvasilev_ru" title="YouTube">YouTube</a>
                 <a href="https://www.tiktok.com/@alexandrvasilev.ru" title="TikTok">TikTok</a>
             </div>

             <p style="margin-top: 25px; margin-bottom: 0;">
                 <a href="https://alexandrvasilev.ru" class="website">
                     Перейти на основной сайт →
                 </a>
             </p>
         </div>
     </div>
 </body>
</html>`;
};

export const baseEmail = generateEmailTemplate("base");
export const optimalEmail = generateEmailTemplate("optimal");
export const premiumEmail = generateEmailTemplate("premium"); 