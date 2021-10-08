import React from 'react';
import './PopupRc.css';

export default class PopupRc extends React.Component{
   
    state = {
        fishi: 'error',
        activated: false,
    }
    rc = this.props.rc

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

    componentDidMount(){
        // const rc = this.props.rc
        console.log('rc: ', this.rc)

    }

    render() {
        return (
            <>
                <div className="PopupRc-main" onClick={this.clicked}>
                    {/* {JSON.stringify(this.props.rc)} */}
                    Specie: {this.rc.SpecieID} ;
                    Size: {this.rc.Size} cm;
                    Date: {this.rc.Date};
                    Note: {this.rc.Note};

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