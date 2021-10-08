import './InfoBar.css'

import React from 'react';
import LHMapPopup from './lhmappopup/LHMapPopup';

export default class InfoBar extends React.Component{

    render() {
        return (
            <div className= "InfoBar-main" >
                <div className="InfoBar-clicker" onClick = {this.props.clickered}>
                    {this.props.active?'>':'<'}
                </div>
                <div className= {"InfoBar-content "+ (this.props.active?'InfoBar-content-a':'')}>
                        {this.props.active_id? (
                            <div className= {"InfoBar-hood"}>
                                <div style={{display:'flex'}}>
                                    <div style={{fontSize:'150%'}}>{this.props.locations[this.props.active_id]['Name']?this.props.locations[this.props.active_id]['Name']:'N/A'}</div>

                                    <div>&nbsp; ID: {this.props.locations[this.props.active_id]['ID']}</div>
                                </div>
                                <div>{'Lat: '+this.props.locations[this.props.active_id]['Lat'] + ', Lng: ' + this.props.locations[this.props.active_id]['Lng']}</div>
                                <div></div>
                                <div>{this.props.locations[this.props.active_id]['Description']}</div>
                            </div>
                        )
                        :'N/A'}
                    <LHMapPopup 
                        fishinfo_cache = {this.props.fishinfo_cache}
                        locationfishlocal = {this.props.locationfishlocal[this.props.active_id]} 
                        postNewFishLocal_initial = {this.props.postNewFishLocal_initial} 
                        id = {this.props.active_id}
                        requestFishInfo_initial = {this.props.requestFishInfo_initial}
                    />
                </div>
            </div>
        )
    }


}