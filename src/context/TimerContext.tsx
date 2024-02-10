import { ReactNode, createContext, useCallback, useContext, useMemo, useReducer } from "react";


interface ContextType{
    count:number;
    step:number;
    addCountByOne:()=>void
    decreaseCountByOne:()=>void
    addCountByValue:(value:number)=>void
    decreaseCountByValue:(value:number)=>void
    restCount:()=>void
    addStepByOne:()=>void
    decreaseStepByOne:()=>void
}

const CounterContext = createContext<ContextType>({
    count:0,
    step:1,
    addCountByOne:()=>{},
    decreaseCountByOne:()=>{},
    addCountByValue:()=>{},
    decreaseCountByValue:()=>{},
    restCount:()=>{},
    addStepByOne:()=>{},
    decreaseStepByOne:()=>{},
})

enum CounterActions{
    INCREASE_COUNTER_BY_ONE='INCREASE_COUNTER_BY_ONE',
    DECREASE_COUNTER_BY_ONE='DECREASE_COUNTER_BY_ONE',
    INCREASE_STEP_BY_ONE='INCREASE_STEP_BY_ONE',
    DECREASE_STEP_BY_ONE='DECREASE_STEP_BY_ONE',
    INCREASE_COUNTER_BY_VALUE='INCREASE_COUNTER_BY_VALUE',
    DECREASE_COUNTER_BY_VALUE='DECREASE_COUNTER_BY_VALUE',
    REST_COUNTER='REST_COUNTER'
}

interface ActionType{
    payload?:number,
    type:CounterActions
}
const initialState={counter:0,step:1}
const CounterReducer = (state:{counter:number,step:number},action:ActionType)=>{

    switch(action.type){
        case CounterActions.INCREASE_COUNTER_BY_ONE:
           return{...state,counter:state.counter+1}
    
        case CounterActions.DECREASE_COUNTER_BY_ONE:
           if(state.counter===0) return{...state,counter:state.counter};
           return{...state,counter:state.counter-1}
    
        case CounterActions.INCREASE_COUNTER_BY_VALUE:
           return{...state,counter:state.counter+state.step}
    
        case CounterActions.DECREASE_COUNTER_BY_VALUE:
            if(state.counter-state.step<0) return{...state,counter:0}
           return{...state,counter:state.counter-state.step}

        case CounterActions.INCREASE_STEP_BY_ONE:
        return{...state,step:state.step+1}
    
        case CounterActions.DECREASE_STEP_BY_ONE:
            if(state.step===1) return{...state,step:1}
        return{...state,step:state.step-1}

        case CounterActions.REST_COUNTER:
           return{...state,counter:0,step:1};
        default:
            return{...state,counter:state.counter,step:state.step}  
    }

}
function ConuterProvider({children}:{children:ReactNode}){

    const[state,dispatch] = useReducer(CounterReducer,initialState);


    const addStepByOne=useCallback(()=>{
        dispatch({type:CounterActions.INCREASE_STEP_BY_ONE})
    },[])

    const decreaseStepByOne =useCallback(()=>{
        dispatch({type:CounterActions.DECREASE_STEP_BY_ONE})
    },[])

    const addCountByOne=useCallback(()=>{
        dispatch({type:CounterActions.INCREASE_COUNTER_BY_ONE})
    },[])

    const decreaseCountByOne =useCallback(()=>{
        dispatch({type:CounterActions.DECREASE_COUNTER_BY_ONE})
    },[])

    const addCountByValue=useCallback((value:number)=>{
        dispatch({type:CounterActions.INCREASE_COUNTER_BY_VALUE,payload:value})
    },[])

    const decreaseCountByValue=useCallback((value:number)=>{
        dispatch({type:CounterActions.DECREASE_COUNTER_BY_VALUE,payload:value})
    },[])
    const restCount=useCallback(()=>{
        dispatch({type:CounterActions.REST_COUNTER})
    },[])


    const value = useMemo(()=>{
        return{
            count:state.counter,
            step:state.step,
            addCountByOne:addCountByOne,
            decreaseCountByOne:decreaseCountByOne,
            restCount:restCount,
            decreaseCountByValue:decreaseCountByValue,
            addCountByValue:addCountByValue,
            decreaseStepByOne:decreaseStepByOne,
            addStepByOne:addStepByOne,
        }
    },[addCountByOne, addCountByValue, addStepByOne, decreaseCountByOne, decreaseCountByValue, decreaseStepByOne, restCount, state.counter, state.step])



    return(
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    )
}

const useCounter = ()=>{
    const context = useContext(CounterContext);
    if(context===undefined) throw new Error('There is a problem in context');
    return context;
}



export {ConuterProvider,useCounter}