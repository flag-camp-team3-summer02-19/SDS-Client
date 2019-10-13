import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Route path="/" exact component={Home} />
                <footer>
                    <section>
                        <h2>About Us</h2>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </section>
                    <section>
                        <h2>What We Do</h2>
                        <p>"Help you make delivery easy!"</p>
                    </section>
                </footer>
            </div>
        </Router>
    );
}

const Home = () => (
    <h1> home page </h1>
);

export default App;
