import React from 'react';
import './LHMapPopup.css';

import { Tooltip} from 'react-leaflet'
import PopupRc from './popuprc/PopupRc'

export default class LHMapPopup extends React.Component{
    /**
     * popup show all fishes caught in such location
     */  
    state = {
        p_specieid: '',
        p_size: '',
        p_date: '',
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
                {/* <Tooltip direction="right" offset={[0, 20]} opacity={1} permanent>
                    [{this.props.v['Lat']}, {this.props.v['Lng']}]
                </Tooltip> */}
                {/* <div>Fish ID: {this.props.v['Specie']} </div>
                <div>Size: {this.props.v['Size']} cm</div>
                <div>[Lat, lng]: [{this.props.v['Lat']}, {this.props.v['Lng']}] </div>
                {this.props.fishinfo_cache[this.props.v['Specie']]} */}
                {this.props.locationfishlocal? Object.keys(this.props.locationfishlocal).map(
                    id =>{
                        return(
                            <PopupRc fishinfo_cache = {this.props.fishinfo_cache} rc = {this.props.locationfishlocal[id]} requestFishInfo_initial = {this.props.requestFishInfo_initial}/>
                        )
                    }
                ):''}

                {this.state.add_new?
                    <div className='lhMapPopup-newfishlocal'>
                        <textarea onChange = {(e)=>this.setState({p_specieid: e.target.value})}  value = {this.state.p_specieid} placeholder = 'id'></textarea>
                        <textarea onChange = {(e)=>this.setState({p_size: e.target.value})} value = {this.state.p_size} placeholder = 'size'></textarea>
                        <textarea onChange = {(e)=>this.setState({p_date: e.target.value})} value = {this.state.p_date} placeholder = 'date'></textarea>
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
        this.props.postNewFishLocal_initial(this.state.p_specieid, this.state.p_size, this.props.id, this.state.p_date, this.state.p_note)
        this.setState({
            p_specieid: '',
            p_size: '',
            p_date: '',
            p_note: '',
        })
    }

}