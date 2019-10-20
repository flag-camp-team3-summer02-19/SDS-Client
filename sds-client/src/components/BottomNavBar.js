import React, {Component} from 'react';

class BottomNavBar extends Component {
    render() {
        return (
            <footer>
                <section>
                    <h2>What We Do</h2>
                    <p>"Help you make delivery easy!"</p>
                </section>
                <section>
                    <h2>About Us</h2>
                    <ul className='bottom-list'>
                        <li>Haoyan Zhang</li>
                        <li>Chuan He</li>
                        <li>Xinrong Zhao</li>
                        <li>John Yang</li>
                        <li>Yanhao Zeng</li>
                        <li>Xuan Li</li>
                        <li>Xiongsheng Yi</li>
                    </ul>
                </section>
            </footer>
        );
    }
}

export default BottomNavBar;