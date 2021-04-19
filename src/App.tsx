import "./App.css";
import { MainPage } from "./container/MainPage";
import { Provider } from "./provider/Provider";

function App() {
	return (
		<Provider>
			<MainPage />
		</Provider>
	);
}

export default App;
