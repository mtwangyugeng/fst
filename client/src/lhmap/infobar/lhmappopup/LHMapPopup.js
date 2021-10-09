import React from 'react';
import './LHMapPopup.css';

import { Tooltip} from 'react-leaflet'
import PopupRc from './popuprc/PopupRc'

import {isHours, isMonthDayYear} from '../../../util/InputCheckers'
export default class LHMapPopup extends React.Component{
    /**
     * popup show all fishes caught in such location
     */  
    state = {
        p_specieid: '',
        p_size: '',

        p_hh: '',
        p_min: '',
        p_mm: '',
        p_dd: '',
        p_yy: '',

        p_note: '',

        add_new: false
    }

    async componentDidMount(){
        // if(this.props.fishinfo_cache[this.props.v['Specie']]){

        // } else{
        //     console.log('INIINI')
        //     this.props.requestFishInfo_initial(this.props.v['Specie'])
        // }
        // console.log('reeeee', this.props.locationfishlocal[0])
    }

    render() {
        return (
            <div className="lhMapPopup-main">
                {this.props.locationfishlocal? Object.keys(this.props.locationfishlocal).map(
                    id =>{
                        return(
                            <PopupRc fishinfo_cache = {this.props.fishinfo_cache} rc = {this.props.locationfishlocal[id]} requestFishInfo_initial = {this.props.requestFishInfo_initial}/>
                        )
                    }
                ):''}

                {this.state.add_new?
                    <div className='lhMapPopup-newfishlocal'>
                        <textarea onChange = {(e)=>this.setState({p_specieid: e.target.value})}  value = {this.state.p_specieid} placeholder = 'specie id'></textarea>
                        <textarea onChange = {(e)=>this.setState({p_size: e.target.value})} value = {this.state.p_size} placeholder = 'size'></textarea>
                        <div className = 'lhMapPopup-date'>
                            <textarea className = 'lhMapPopup-imp' onChange = {(e)=>this.setState({p_hh: e.target.value})} value = {this.state.p_hh} placeholder = 'hh'></textarea>&nbsp;;&nbsp;
                            <textarea className = 'lhMapPopup-imp' onChange = {(e)=>this.setState({p_mm: e.target.value})} value = {this.state.p_mm} placeholder = 'mm'></textarea>&nbsp;/&nbsp;
                            <textarea className = 'lhMapPopup-imp' onChange = {(e)=>this.setState({p_dd: e.target.value})} value = {this.state.p_dd} placeholder = 'dd'></textarea>&nbsp;/&nbsp;
                            <textarea className = 'lhMapPopup-imp' onChange = {(e)=>this.setState({p_yy: e.target.value})} value = {this.state.p_yy} placeholder = 'yy'></textarea>
                        </div>
                        <textarea onChange = {(e)=>this.setState({p_note: e.target.value})} value = {this.state.p_note} placeholder = 'note'></textarea>
                        <button onClick = {this.sendFishlocal}>send data</button>
                        <button onClick = {()=>{this.setState({add_new: false})}}>close</button>
                    </div>
                    :( this.props.id? <button onClick = {()=>{this.setState({add_new: true})}}>Add new.</button>: '')
                }
            </div>
        )
    }

    sendFishlocal = () => {
        try{
            isHours(this.state.p_hh )
            isMonthDayYear(this.state.p_mm, this.state.p_dd, this.state.p_yy)
            const date = this.state.p_hh + ';' + this.state.p_mm + '/' + this.state.p_dd + '/' + this.state.p_yy
            if (this.props.postNewFishLocal_initial(this.state.p_specieid, this.state.p_size, this.props.id, date, this.state.p_note))
                this.setState({
                    p_specieid: '',
                    p_size: '',
                    
                    p_min: '',
                    p_mm: '',
                    p_dd: '',
                    p_yy: '',

                    p_note: '',
                })
        }catch(e){
            console.log(e)
            if(typeof e === 'string')
                this.props.setMyState(e)
        }
    }

}