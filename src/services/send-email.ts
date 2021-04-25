import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { ChallengeRegistrationDetails } from '../types/ownTypes';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const transporter = nodemailer.createTransport({
  host: 'smtp.websupport.sk',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendPaymentEmail(details: ChallengeRegistrationDetails) {
  const response = await transporter.sendMail({
    from: '"OSA Virtual Challenge" <virtualchallenge@osaacademy.sk>',
    to: details.email,
    bcc: [
      'nemecekandrej@gmail.com',
      'osaacademy@gmail.com',
      'nemecek@osaacademy.sk',
    ],
    subject: `Registrácia výzvy ${details.challengeName} 💪`,
    html: `
      Ahoj ${details.userName.split(' ')[0]},<br/>
      ďakujeme, že si sa zaregistroval(a) na výzvu <strong>${
        details.challengeName
      }</strong>. Dnešným dňom Ti začína plynúť časový limit na splnenie výzvy – <strong>${
      details.challengeTimePeriod
    } dní</strong>.
      
      <br /><br />Pre splnenie všetkých podmienok úspešnej registrácie je potrebné realizovať úhradu štartovného poplatku a to nasledovne: <br/>
      IBAN: <strong>SK96 0900 0000 0050 5114 8921</strong>,<br/>
      Suma: <strong>${details.price} €</strong>,<br/>
      Variabilný symbol: <strong>${details.id + 1000}</strong>,<br/>
      Informácia pre príjemcu (poznámka): <strong>${
        details.userName
      }</strong><br/><br/>
      Ďakujeme Ti ${
        details.userName.split(' ')[0]
      }, že svojou aktivitou prispievaš na dobrú myšlienku, pomáhať v rozvoji športových zručností a schopností detí v našej OSA AKADÉMII, no hlavne si vzorom  pre svojich najbližších.<br/><br/>
      Športu zdar!<br/>
      OSA TEAM<br /><br/>
      Viac info o projekte OSA – ŠPORTOVÁ AKADÉMIA nájdeš na: <br />
      Webe: <a href="https://www.osaacademy.sk/" target="_blank">https://www.osaacademy.sk/</a><br /> 
      Instagrame: <a href="https://www.instagram.com/osasportacademy/" target="_blank">https://www.instagram.com/osasportacademy/</a><br />
      Facebooku: <a href="https://www.facebook.com/osasportacademy" target="_blank">https://www.facebook.com/osasportacademy</a>`,
  });
}
