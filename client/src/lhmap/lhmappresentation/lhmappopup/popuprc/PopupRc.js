import React from 'react';
import './PopupRc.css';

export default class PopupRc extends React.Component{
   

    async componentDidMount(){
    }

    clicked = () => {
        console.log('clicked', typeof this.props.rc)
        console.log(this.props.rc['SpecieID'])
        this.props.requestFishInfo_initial(this.props.rc['SpecieID'])
    }

    render() {
        return (
            <div className="PopupRc-main" onClick={this.clicked}>
                RC
                {JSON.stringify(this.props.rc)}
            </div>
        )
    }


}