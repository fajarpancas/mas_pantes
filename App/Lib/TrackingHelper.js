let isTrackingRequest = false

export function setTrackingRequest (newState){
    isTrackingRequest = newState
    console.tron.error({newState})
}

export function getTrackingRequest (){
    return isTrackingRequest
}

