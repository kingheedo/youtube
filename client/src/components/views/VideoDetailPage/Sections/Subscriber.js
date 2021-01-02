import Axios from 'axios'
import React,{useState,useEffect} from 'react'

function Subscriber(props) {
    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        const subscribeNumberVariables = { userTo: props.userTo, userFrom: props.userFrom }
        Axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get subscriber Number')
                }
            })

            Axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subscribed)
                } else {
                    alert('Failed to get Subscribed Information')
                }
            })

        },[])

        const onSubscribe =() =>{

            let subscribedVariable ={
                userTo: props.userTo,
                userFrom: props.userFrom
            }

            // 이미 구독중이라면
            if(Subscribed){
                Axios.post('/api/subscribe/unSubscribe',subscribedVariable)
                .then(response =>{
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber -1)
                        setSubscribed(!Subscribed)
                    }else{
                        alert('구독 취소 하는데 실패 하였습니다.')
                    }
                })
                // 아직 구독 중이 아니라면
            }else{
                Axios.post('/api/subscribe/subscribe',subscribedVariable)
                .then(response =>{
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    }else{
                        alert('구독 하는데 실패 하였습니다.')
                        
                    }
                })
            }
        }
    return (
        <div>
            <button
            style={{backgroundColor:`${Subscribed ? '#AAAAAA':'#CC0000'}`,borderRadius:'4px',
            color:'white', padding:'10px 16px',
            fontWeight:'500',fontSize:'1rem',textTransform:'uppercase'}}
            onClick ={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed': 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscriber
