import React from "react"
import { GitHubIcon } from './../components/Icons'
import styles from "./../scss/AboutPage.module.scss";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tools}>
        <ul>
          <h1>My Tools:</h1>
          <li>
            <h3>
              <span> Backend:</span> Javascript, Node.js, Express.js, JSON Web Token, Mysql
            </h3>
          </li>
          <li>
            <h3>
              <span> Frontend:</span> Javascript, React, Redux, Html, Css, Sass
            </h3>
          </li>
        </ul>
        <div className={styles.github}>
            <GitHubIcon />
            <a href='https://github.com/joselfv1979/my-store'>https://github.com/joselfv1979/my-store</a>
        </div>
      </div>
    </div>
  );
};

export default About;
