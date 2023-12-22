import { GitHubIcon } from '../../components/svgs/Icons'
import styles from "../../assets/scss/AboutPage.module.scss";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tools}>
        <ul>
          <h1>My Tools:</h1>
          <li>
            <h3>
              <span> Backend:</span> Typescript, Node.js, Express.js, Jwt, Mysql
            </h3>
          </li>
          <li>
            <h3>
              <span> Frontend:</span> Typescript, React, Redux, Bootstrap, Sass
            </h3>
          </li>
        </ul>
        <div className={styles.github}>
            <GitHubIcon width="1.3rem" />
            <a href='https://github.com/joselfv1979/my-store'>https://github.com/joselfv1979/my-store</a>
        </div>
      </div>
    </div>
  );
};

export default About;
