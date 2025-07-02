import { transporter } from "../config/email";
import logger from "../config/logger";

const EMAIL_ENABLED = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

export interface EmailResult {
  success: boolean;
  message: string;
}

const template = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Курс по невербальному программированию - ИNTEGRAAL</title>
    <style>
        body{font-family:Arial,sans-serif;font-size:14px;color:#a2a2a2;background:#000;margin:0;padding:0}
        table{border-collapse:collapse;width:100%}
        .container{max-width:600px;margin:0 auto;background:#000}
        .header{background:#000;padding:30px 20px;text-align:center;border-bottom:1px solid #1C1C1C}
        .logo{height:50px;vertical-align:middle}
        .title{font-size:26px;font-weight:700;color:#fff;margin:10px 0 0 10px;display:inline-block;vertical-align:middle}
        .accent{color:#EDB834}
        .content{padding:30px 20px}
        .course-title{font-size:26px;text-transform:uppercase;font-weight:700;color:#fff;text-align:center;margin-bottom:20px}
        .subtitle{font-size:16px;color:#a200ff;text-align:center;margin-bottom:30px}
        .description{font-size:14px;color:#a2a2a2;text-align:center;margin-bottom:30px;line-height:1.5}
        .badge{background:#EDB834;border-radius:10px;padding:15px;text-align:center;margin:20px auto;width:180px;color:#000;font-weight:600}
        .lessons{border-radius:10px;padding:25px;margin:25px 0}
        .lesson{background:#1C1C1C;border-radius:8px;padding:15px;padding-bottom:25px;margin-bottom:20px;border-left:4px solid #a200ff}
        .lesson-num{font-size:12px;color:#EDB834;font-weight:600;margin-bottom:5px}
        .lesson-title{font-size:14px;color:#fff;font-weight:600;margin-bottom:8px}
        .lesson-desc{font-size:13px;color:#a2a2a2;margin-bottom:15px}
        .lesson-link{background:#EDB834;color:#000;padding:8px 12px;border-radius:5px;text-decoration:none;font-size:12px;font-weight:600}
        .cta{text-align:center;margin:30px 0}
        .cta-btn{display:inline-block;background:#EDB834;color:#000;padding:15px 25px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px}
        .footer{background:#181818;padding:25px 20px;text-align:center;border-top:1px solid #1C1C1C}
        .footer-logo{height:35px;margin-bottom:15px}
        .contacts{font-size:11px;color:#a2a2a2;margin-bottom:15px}
        .social{margin:15px 0}
        .social a{display:inline-block;padding:8px 12px;background:#3e3e3e;border-radius:20px;margin:0 5px;color:#fff;text-decoration:none;vertical-align:middle;text-align:center;font-size:11px;font-weight:500;transition:background 0.3s ease}
        .website{color:#EDB834;text-decoration:none;font-weight:600}
        @media(max-width:480px){.course-title{font-size:20px}.subtitle{font-size:14px}.lessons{padding:15px}.badge{width:160px}}
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
                 <h2 style="font-size:20px;color:#fff;text-align:center;margin-bottom:20px">Содержание курса</h2>
                 
                 <div class="lesson">
                     <div class="lesson-num">Введение</div>
                     <div class="lesson-title">Вступительный урок и знакомство с курсом</div>
                     <div class="lesson-desc">Основы методики и принципы работы с телом</div>
                     <a href="https://youtube.com/shorts/v3lTJE_Qx8g?si=BhZr3l2Yt8PSXQJL" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-num">Урок 1</div>
                     <div class="lesson-title">Избавление от суеты</div>
                     <div class="lesson-desc">Прием избавления от суеты через тело</div>
                     <a href="https://youtube.com/shorts/1z7Ptw1y88g?si=goulin9zMEOH_kxz" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-num">Урок 2</div>
                     <div class="lesson-title">Отключаем стыд</div>
                     <div class="lesson-desc">Техника избавления от чувства стыда</div>
                     <a href="https://youtube.com/shorts/mA4oE94ESJU?si=Rtro56lsK3UF7Ea3" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-num">Урок 3</div>
                     <div class="lesson-title">Отпускаем чувство обиды</div>
                     <div class="lesson-desc">Как убрать чувство обиды и перестать обижаться на других</div>
                     <a href="https://youtube.com/shorts/-TU2cuE7pqY?si=HyVULCEsimnRW4jz" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-num">Урок 4</div>
                     <div class="lesson-title">Убираем гнев</div>
                     <div class="lesson-desc">Нивелируем состояние гнева</div>
                     <a href="https://youtube.com/shorts/qMW4NCv6y6U?si=1DmYMMWDeHABmM-2" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-num">Урок 5</div>
                     <div class="lesson-title">Гасим похоть</div>
                     <div class="lesson-desc">Приглушаем похоть и не даем ей выражаться</div>
                     <a href="https://youtube.com/shorts/_rHh4Ts2qsM?si=tubxLzfYuPPsVGSc" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-num">Урок 6</div>
                     <div class="lesson-title">Сдерживаем смех</div>
                     <div class="lesson-desc">Техника сдерживания смеха в неуместных ситуациях</div>
                     <a href="https://youtube.com/shorts/p12aUCMOQB0?si=wMhN5GDriFb1sVXx" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-num">Урок 7</div>
                     <div class="lesson-title">Сбрасываем стресс</div>
                     <div class="lesson-desc">Освобождаемся от его влияния</div>
                     <a href="https://youtube.com/shorts/thacmW7EfhM?si=zDW6SrYBUS6oCoIC" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-num">Урок 8</div>
                     <div class="lesson-title">Нейтрализуем тревожность</div>
                     <div class="lesson-desc">Снижаем мгновенно тревожность</div>
                     <a href="https://youtube.com/shorts/2LZGECx0gnI?si=5cgZ4djvGi1Sqr3-" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-num">Урок 9</div>
                     <div class="lesson-title">Отбиваемся от уныния</div>
                     <div class="lesson-desc">Снижаем уныние и перестаем его испытывать</div>
                     <a href="https://youtube.com/shorts/p82tXgMT7rM?si=dRsnzukShoGC0lZK" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-num">Урок 10</div>
                     <div class="lesson-title">Отбрасываем сомнения</div>
                     <div class="lesson-desc">Отбрасываем мысли сеющие сомнения</div>
                     <a href="https://youtube.com/shorts/DsjDsyjqNVA?si=6pxLSSGeJyfflTpF" class="lesson-link">Смотреть урок</a>
                 </div>

                 <div class="lesson">
                     <div class="lesson-num">Урок 11</div>
                     <div class="lesson-title">Отключаем страх</div>
                     <div class="lesson-desc">Освобождаемся от страха и перестаем его испытывать</div>
                     <a href="https://youtube.com/shorts/oQQtcxts56w?si=IaPUwT9NSNam6Xf0" class="lesson-link">Смотреть урок</a>
                 </div>

                <div class="lesson">
                     <div class="lesson-num">Урок 12</div>
                     <div class="lesson-title">Нивелируем раздражительность</div>
                     <div class="lesson-desc">Избавляемся от раздражительности в моменте</div>
                     <a href="https://youtube.com/shorts/hDGu65v5eDM?si=Jt6bKMBMqgiZGefV" class="lesson-link">Смотреть урок</a>
                 </div>

                <div class="lesson">
                     <div class="lesson-num">Урок 13</div>
                     <div class="lesson-title">Максимальная концентрация</div>
                     <div class="lesson-desc">Повышаем концентрацию и сосредоточенность</div>
                     <a href="https://youtube.com/shorts/BqWI_M6Ft4Q?si=gNvQn3SZKObBS7ls" class="lesson-link">Смотреть урок</a>
                 </div>

                <div class="lesson">
                    <div class="lesson-num">Урок 14</div>
                     <div class="lesson-title">Активируем терпение</div>
                     <div class="lesson-desc">Повышаем терпение и выдержку</div>
                     <a href="https://youtube.com/shorts/GXeuZw1R-f4?si=3VOw46-NDRqT-z-L" class="lesson-link">Смотреть урок</a>
                 </div>

                <div class="lesson">
                    <div class="lesson-num">Заключительный урок</div>
                     <div class="lesson-title">Как применять методику в повседневной жизни</div>
                     <div class="lesson-desc">Делать это незаментно для окружающих</div>
                     <a href="https://youtube.com/shorts/YrLrtvI9ta4?si=0yM4N_L55O-HDAwy" class="lesson-link">Смотреть урок</a>
                 </div>
             </div>

            <div class="cta">
                 <a href="https://youtube.com/playlist?list=PL4i_yzJP13U0EhEfDSUOa2_g5HG9Lwfda&si=hQrj-qta0sV-Ktgc" class="cta-btn">
                     Весь плейлист
                 </a>
             </div>

             <div class="cta">
                 <a href="https://alexandrvasilev.ru/nonverbal-programming" class="cta-btn">
                     Перейти на страницу курса
                 </a>
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

             <p>
                 <a href="https://alexandrvasilev.ru" class="website">
                     Перейти на основной сайт →
                 </a>
             </p>
         </div>
     </div>
 </body>
</html>`;

export const sendCourseEmail = (email: string): Promise<EmailResult> => {
  // Нет credentials → email отключён
  if (!EMAIL_ENABLED) {
    logger.warn("Отправка email отключена – отсутствуют EMAIL_USER/EMAIL_PASS");
    return Promise.resolve({ success: false, message: "Email disabled" });
  }

  // Пустой email → нечего отправлять
  if (!email) {
    logger.warn("sendCourseEmail вызван без email");
    return Promise.resolve({ success: false, message: "Email not provided" });
  }

  const emailPromise = new Promise<EmailResult>((resolve) => {
    transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "НЕВЕРБАЛЬНОЕ ПРОГРАММИРОВАНИЕ (Курс из 16 видеоуроков)",
        html: template,
      },
      (error: Error | null, info: any) => {
        if (error) {
          logger.error("Ошибка отправки письма", { error: error.message, email });
          resolve({ success: false, message: error.message || "Ошибка отправки письма" });
        } else {
          logger.info("Письмо с курсом отправлено успешно", { email, messageId: info.messageId });
          resolve({ success: true, message: "Письмо успешно отправлено" });
        }
      }
    );
  });

  // Если за 20 сек. ничего не произошло – считаем неуспехом, но не бросаем.
  const timeoutPromise = new Promise<EmailResult>((resolve) => {
    setTimeout(() => {
      resolve({ success: false, message: "Timeout" });
    }, 20000);
  });

  return Promise.race([emailPromise, timeoutPromise]);
};
