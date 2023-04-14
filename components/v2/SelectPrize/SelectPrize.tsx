import React from 'react';
import styles from './SelectPrize.module.scss';
import { SelectPrizePropsI } from './SelectPrizeProps';
import gameApi, { getArbiter, getRulesContract } from 'gameApi';
import { GameProposedEventObject } from '.generated/contracts/esm/types/polygon/Arbiter';
import router from 'next/router';
export const SelectPrize: React.FC<SelectPrizePropsI> = ({ gameType }) => {
  const createNewGameHandler = async (isPaid: boolean = false) => {
    let proposeGameResult: GameProposedEventObject = await gameApi.proposeGame(
      await getArbiter(),
      (
        await getRulesContract(gameType)
      ).address,
      isPaid
    );
    return proposeGameResult.gameId.toNumber();
  };

  const clickHandler = async (stake: false | 'stake') => {
    createNewGameHandler(!!stake)
      .then((gameId) => {
        router.push(`/games/${gameType}?game=${gameId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className={styles.chooseStake}>
      <div className={styles.gradientBorder}>
        <button
          className={styles.stakeButton}
          onClick={async (event) => clickHandler(false)}
        >
          No stake
          <div className={styles.imageWrapper}>
            <img src="/images/handshake.png" alt="handshake" />
          </div>
        </button>
      </div>
      <div className={styles.gradientBorder}>
        <button
          className={styles.stakeButton}
          onClick={async (event) => clickHandler('stake')}
        >
          Stake 1
          <div className={styles.imageWrapper}>
            <img src="/images/matic.png" alt="matic" />
          </div>
        </button>
      </div>
    </div>
  );
};
