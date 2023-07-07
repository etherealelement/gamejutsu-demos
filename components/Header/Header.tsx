import { useTranslation } from 'react-i18next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Logo, Navigation, NavPath } from 'components';
import { HeaderPropsI } from './HeaderProps';
import styles from './Header.module.scss';
import { FaChevronDown } from "react-icons/fa"
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import accountAvatar from "public/logo/account-avatar.png"

export const Header: React.FC<HeaderPropsI> = ({ version }) => {
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const parsedPath = asPath.split('/').filter((el) => el.length !== 0);
  const currentPath = parsedPath[0];

  function renderConnectButton() {

    
    return (
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

            

          if (currentPath?.split('?')[0] === 'connect') {
            return null;
          }

          if (!connected) {
            return (
							<button onClick={openConnectModal} type="button" className={styles.customConnect}>
								Connect Wallet
							</button>
						)
          }

          if (chain.unsupported) {
            return (
              <button onClick={openChainModal} type="button">
                Wrong network
              </button>
            );
          }

          return (
						<div style={{ display: "flex", gap: 8 }}>
							<button onClick={openChainModal} type="button" className={styles.chainName}>
								{chain.iconUrl && <Image src={chain.iconUrl} width={20} height={20} alt={chain.name ?? "Chain icon"} />}
								<FaChevronDown />
							</button>
							<button onClick={openAccountModal} type="button" className={styles.walletAddress}>
								<Image src={accountAvatar.src} width={20} height={20} alt="Account avatar" />
								{account.displayName}
								{/* {account.displayBalance ? ` (${account.displayBalance})` : ""}
								{account.displayName} */}
								<FaChevronDown />
							</button>
						</div>
					)
        }}
      </ConnectButton.Custom>
    );
  }

  return (
		<div className={styles.container}>
			{asPath !== "/" && currentPath?.split("?")[0] !== "connect" ? (
				<NavPath path={asPath} />
			) : // <NavPath path={'Game Demo'} />
			null}
			<div className={styles.left}>
				<Link href="/">
					<a>
						<Logo image="/logo/gj-logo-ninja.png" />
					</a>
				</Link>
				<h3 className={styles.text}>
					GAME<span className={styles.textColor}>JUTSU</span>
				</h3>
				<div className={styles.version}>{`ver. ${version}`}</div>
			</div>
			<div className={styles.right}>
				{/* {currentPath?.split('?')[0] !== 'connect' && <Navigation active={currentPath} />} */}
				{currentPath?.split("?")[0] !== "connect" && <div >{renderConnectButton()}</div>}
			</div>
		</div>
	)
};
