import styles from "../../styles/Home.module.css";
import React from "react";
import Image from "next/image";
import githubLogoImage from "../../public/github_logo.png"
import wikipediaLogoImage from "../../public/wikipedia_logo.png";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a href={'https://github.com/johnyatesiv/collatz-visualizer'}>
                {/*Github*/}
                <Image src={githubLogoImage} width={30} height={30} />
            </a>
            <a href={'https://en.wikipedia.org/wiki/Collatz_conjecture'}>
                {/*Wikipedia*/}
                <Image src={wikipediaLogoImage} width={30} height={30} />
            </a>
        </footer>
    )
}
