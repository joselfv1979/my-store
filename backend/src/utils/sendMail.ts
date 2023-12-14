import nodemailer from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";
import { CustomError } from "../models/CustomError";
import { IUser } from "../models/User";

const SENDER_EMAIL = `${process.env.EMAIL_USER}`;
const PASS = `${process.env.EMAIL_PASS}`;

// point to the template folder
const handlebarOptions: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, "../utils/templates"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "../utils/templates"),
};

type Payload = {
  user?: IUser,
  link?: string
}

//send mail
const sendMail = async (
  payload: Payload,
  subject: string,
  mailTemplate: string
) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SENDER_EMAIL,
        pass: PASS,
      },
    });

    // use a template file with nodemailer
    transport.use("compile", hbs(handlebarOptions));

    const mailOptions = {
      from: SENDER_EMAIL,
      template: mailTemplate,
      to: payload?.user?.email,
      subject: subject,
      context: {
        name: payload?.user?.username,
        link: payload.link ?? null,
      },
    };

    return await transport.sendMail(mailOptions);
  } catch (error) {
    throw new CustomError(500, "Couldn't send email, try it again");
  }
};

export default sendMail;
