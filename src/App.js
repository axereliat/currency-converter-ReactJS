import React, {Component, Fragment} from 'react';
import Home from "./components/Home";
import ThemeContext from "./context/theme-context";

class App extends Component {

    state = {
        theme: localStorage.getItem('theme') || 'lightTheme'
    };

    toggleTheme = () => {
        const newTheme = this.state.theme === 'lightTheme' ? 'darkTheme' : 'lightTheme';

        localStorage.setItem('theme', newTheme);
        this.setState({
            theme: newTheme
        });
    };

    render() {
        return (
            <Fragment>
                <ThemeContext.Provider value={{
                    theme: this.state.theme,
                    toggleTheme: this.toggleTheme
                }}>
                    <Home/>
                </ThemeContext.Provider>
            </Fragment>
        );
    }
}

export default App;
