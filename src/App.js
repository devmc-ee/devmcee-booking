import React, { useState } from "react";
import './App.css'
import ServicesContainer from "./ServicesContainer";
import ServiceBaseSelect from "./components/ServiceBaseSelect";
import ServiceOptionSelect from "./components/ServiceOptionSelect";
import { AppContext } from "./AppContext";
import ServiceGroup from "./components/ServiceGroup";
import ServicePrice from "./components/ServicePrice";

export default function App() {
	const [serviceBaseValue, setServiceBaseValue] = useState("");
	const [serviceOptionValue, setServiceOptionValue] = useState("");
	const contextValues = {
		lang: "en",
		testValue: "testValuessssss"
	};
	return (
		<div className="App">
			<AppContext.Provider value={contextValues}>
				<ServicesContainer>
					<ServiceGroup
						serviceGroupdId={0}
						serviceBase={
							<ServiceBaseSelect
								value={serviceBaseValue}
								onChange={setServiceBaseValue}
								serviceGroupdId={0}
							/>
						}
						serviceOption={
							<ServiceOptionSelect
								servicebase={serviceBaseValue}
								value={serviceOptionValue}
								onChange={setServiceOptionValue}
								serviceGroupdId={0}
							/>
						}
						servicePrice={<ServicePrice serviceOption={serviceOptionValue} />}
						serviceDeleteBtn={<button>X</button>}
					/>
				</ServicesContainer>
			</AppContext.Provider>
		</div>
	);
}
