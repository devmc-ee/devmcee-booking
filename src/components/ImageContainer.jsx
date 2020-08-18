import React, {useRef, useState} from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";


const ImageContainer = ({flag, alpha3Code}) => {
	const ref = useRef();
	const [isVisible, setIsVisible] = useState(false);
	console.log(ref)

	useIntersectionObserver({
		target: ref,
		onIntersect: ([{isIntersecting}], observerElement) => {
			if (isIntersecting) {
				if (!isVisible) {

					setIsVisible(true)
				}
				observerElement.unobserve(ref.current)
			}
		}
	});
	if (! 'IntersectionObserver' in window) {
		setIsVisible(true)
	}
	return (
		<span className="flag-container" ref={ref}>
			{isVisible &&
			(<img
				 className="country-flag" src={flag} width="20" alt={alpha3Code}/>)}
		</span>
	)

}
export default ImageContainer;
