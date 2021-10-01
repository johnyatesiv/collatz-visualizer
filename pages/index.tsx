import React, {useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'
import CollatzVisualizer from "./components/CollatzVisualizer";
import Footer from "./components/Footer";
import { CollatzAlgorithm } from "../api/algo";
import MainContent from "./components/MainContent";
import Header from "./components/Header";

export default function Home() {
    const [currentValue, setCurrentValue] = useState<number>(5);
    const [generatedValues, setGeneratedValues] = useState<[number, number][]>([[1, 1]]);
    const [maxValue, setMaxValue] = useState<number>(0);

    useEffect(() => {
        try {
            const algo = new CollatzAlgorithm(currentValue);
            const output = algo.run();
            const maxValue = algo.max;

            if (output) {
                setGeneratedValues(output);
                setMaxValue(maxValue);
            }
        } catch (e) {
            // bad input to the algorithm
        }
    }, [currentValue]);

    return (
        <div className={styles.container}>
            <Header />

            <MainContent
                generatedValues={generatedValues}
                maxValue={maxValue}
                setCurrentValue={setCurrentValue}
                currentValue={currentValue}
            />

            <CollatzVisualizer generatedValues={generatedValues} />

            <Footer></Footer>
        </div>
    )
}
