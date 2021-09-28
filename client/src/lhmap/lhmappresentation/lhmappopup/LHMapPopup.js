import React from 'react';
import './LHMapPopup.css';

import { Tooltip} from 'react-leaflet'

export default class LHMapPopup extends React.Component{
    /**
     * popup show all fishes caught in such location
     */  
    async componentDidMount(){
        // if(this.props.fishinfo_cache[this.props.v['Specie']]){

        // } else{
        //     console.log('INIINI')
        //     this.props.requestFishInfo_initial(this.props.v['Specie'])
        // }
        console.log('reeeee', this.props.locationfishlocal)
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
                {JSON.stringify(this.props.locationfishlocal)}
            </div>
        )
    }

}