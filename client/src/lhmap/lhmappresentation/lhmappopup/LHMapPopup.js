import React from 'react';
import './LHMapPopup.css';

import { Tooltip} from 'react-leaflet'

export default class LHMapPopup extends React.Component{
    state = {
        fishd: <></>
    }
    async requestFishInfo (specie) {
        var finale = ''
        await fetch('http://localhost:3000/fishinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'Specie': specie
                })
            })
            .then((v)=>v.text())
            .then(data => JSON.parse(data))
            .then(d => {
                    console.log(d)
                    this.setState({
                        fishd: 
                        <div className="lhMapPopup-fishinfo">
                            <img className = "lhMapPopup-fishpic" alt = 'Fish pic' src = {d['Iurl']}/>
                            <div>{d['Name']}</div>
                            <div>{d['Description']}</div>
                        </div>
                    })}
                )

        console.log(finale)    
        return  finale
      }

    componentDidMount(){
        this.requestFishInfo(this.props.v['Specie'])
    }

    render() {
        return (
            <div className="lhMapPopup-main">
                <Tooltip direction="right" offset={[0, 20]} opacity={1} permanent>
                    [{this.props.v['Lat']}, {this.props.v['Lng']}]
                </Tooltip>
                <div>Fish ID: {this.props.v['Specie']} </div>
                <div>Size: {this.props.v['Size']} cm</div>
                <div>[Lat, lng]: [{this.props.v['Lat']}, {this.props.v['Lng']}] </div>
                {this.state.fishd}
            </div>
        )
    }

}