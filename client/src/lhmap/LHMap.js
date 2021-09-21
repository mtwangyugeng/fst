import React from 'react';
import LHMapPresentation from './lhmappresentation/LHMapPresentation';
import * as ic from'../util/InputCheckers'

export default class LHMap extends React.Component{
    state = {
        mystate: 'TESTMYSTATE',
        incidents: [],

        p_specie: '',
        p_size: '',
        p_lat: '',
        p_lng: ''
      }
    async refreshAll(){
        console.log('refreshing')
        await fetch('http://localhost:3000/alldata').then((v) => {
            if(v.ok){
                return v
            }else {
                throw new Error('no response from server');
            }
            }).then((v)=>v.text())
            .then(data => this.setState({incidents: data.split('|')}))
            .catch((error) => {
                this.setState({mystate: 'No response from server'})
        });
    }
    
    async requestFishInfo (specie){
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
            .then(data => finale = data.split('|'))

        console.log(finale)    
        return  finale
      }

    async componentDidMount() {
        this.refreshAll()
    }

    postNewFishLocal=()=>{
        fetch('http://localhost:3000/popo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'Specie': this.state.p_specie,
                    'Size': this.state.p_size,
                    'Lat': this.state.p_lat,
                    'Lng': this.state.p_lng  
                })
            })
                        .then((v)=>v.text())
                        .then(data => {})
      }

    sendData = () => {
        try{
            ic.isSpecie(this.state.p_specie)
            ic.isSize(this.state.p_size)
            ic.isLat(this.state.p_lat)
            ic.isLng(this.state.p_lng)
            this.postNewFishLocal()
            this.refreshAll()
        }catch(e){
            this.setState({mystate: e})
        }
    }

    render() {
        return (
            <>
            {this.state.mystate}
            <textarea onChange = {(e)=>this.setState({p_specie: e.target.value})} placeholder = 'Specie ID'></textarea>
            <textarea onChange = {(e)=>this.setState({p_size: e.target.value})} placeholder = 'Size'></textarea>
            <textarea onChange = {(e)=>this.setState({p_lat: e.target.value})} placeholder = 'Lat'></textarea>
            <textarea onChange = {(e)=>this.setState({p_lng: e.target.value})} placeholder = 'Lng'></textarea>
            <button id='pr' onClick = {this.sendData}>send data</button>
            <LHMapPresentation incidents = {this.state.incidents} center = {this.props.center}/>
            </>
        )
    }

}