import React, { Component } from 'react';






 class Example extends Component {
    render() {
        return(
            <React.Fragment>
                <p> fragment p1 </p>
                <p> fragment p2 </p>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Example />, document.getElementById('root'));