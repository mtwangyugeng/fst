import React from 'react';
import './PopupRc.css';

export default class PopupRc extends React.Component{
   
    state = {
        fishi: 'error',
        activated: false,
    }

    async componentDidMount(){
    }

    clicked = () => {
        if (this.state.activated){
            this.setState({activated: false});
        }else{
            this.setState({activated: true});
            if(this.props.rc['SpecieID']){
                
                console.log('clicked', typeof this.props.rc)
                console.log(this.props.rc['SpecieID'])
                if(this.props.fishinfo_cache[this.props.rc['SpecieID']]){
                    this.setState({fishi: this.props.fishinfo_cache[this.props.rc['SpecieID']]})
                }else{this.props.requestFishInfo_initial(this.props.rc['SpecieID']).then((temp) => {this.setState({fishi: temp})})}
                
                
            }
        }
    }

    render() {
        return (
            <>
                <div className="PopupRc-main" onClick={this.clicked}>
                    RC
                    {JSON.stringify(this.props.rc)}

                </div>
                {
                    this.state.activated?
                    <>
                    {this.state.fishi}
                    </>:''
                }
            </>
        )
    }


}