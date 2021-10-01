import styles from "../../styles/Home.module.css";
import React, {Dispatch, SetStateAction} from "react";
import Image from "next/image";
import collatzHeadShotImage from "../../public/lothar_collatz.jpeg";
import collatzFunctionImage from "../../public/collatz_func.svg";

export function MainContent(
    props: {
        generatedValues: [number, number][],
        maxValue: number,
        currentValue: number,
        setCurrentValue: Dispatch<SetStateAction<number>>
    }
) {
    return (
        <div className={styles.main}>
            <div className={styles.infoContent}>
                <Image src={collatzHeadShotImage} className={styles.collatzHeadShot}/>
                <div>
                    The Collatz conjecture is an unsolved problem in mathematics concerning the convergence of a certain sequence. <br/>
                    Given this function for a positive integer, <br/><br/>
                    <Image alt={'Collatz Algorithm'} src={collatzFunctionImage} />
                    <br/><br/>

                    The Collatz conjecture states that the sequence will eventually converge to 1. <br/>
                    Try plugging in some numbers and observing the outcomes.

                    <div className={styles.inputControl}>
                        <div>
                            <div className={styles.inputForm}>
                                <form>
                                    <label className={styles.inputLabel}>Start: </label>
                                    <input
                                        className={styles.algoInput}
                                        min={1}
                                        type={'number'}
                                        value={props.currentValue}
                                        onChange={e => props.setCurrentValue(Number(e.target.value))}
                                    />
                                </form>
                            </div>
                            <QuickStatsContent
                                generatedValues={props.generatedValues}
                                maxValue={props.maxValue}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function QuickStatsContent(
    props: {
        generatedValues: [number, number][],
        maxValue: number
    }
) {
    return (
        <div className={styles.statsTable}>
            <div className={styles.table}>
                <div className={styles.tableRow}>
                    <div className={styles.tableCell}>Total steps to converge</div>
                    <td className={styles.tableCell}>{props.generatedValues.length}</td>
                </div>
                <div className={styles.tableRow}>
                    <div className={styles.tableCell}>Maximum value in sequence</div>
                    <div className={styles.tableCell}>{props.maxValue ? props.maxValue: '?'}</div>
                </div>
            </div>
        </div>
    )
}
