import "./style.css";

import instagram from './../../img/icons/instagram.svg';
import linkedIn from './../../img/icons/linkedIn.svg';
import gitHub from './../../img/icons/gitHub.svg';

const Footer = () => {
    return (
		<footer className="footer">
			<div className="container">
				<div className="footer__wrapper">
					<ul className="social">
						<li className="social__item">
							<a href="https://www.instagram.com/skuratovanton/">
								<img src={instagram} alt="Link" />
							</a>
						</li>
						<li className="social__item">
							<a href="https://github.com/SkuratovAnton">
								<img src={gitHub} alt="Link" />
							</a>
						</li>
						<li className="social__item">
							<a href="https://www.linkedin.com/in/anton-skuratov-6780b726a/">
								<img src={linkedIn} alt="Link" />
							</a>
						</li>
					</ul>
					<div className="copyright">
						<p>&copy; 2023 Skuratov Anton</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;