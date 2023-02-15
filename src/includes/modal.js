import { useDispatch } from "react-redux";

const  ModalView=(title, mainText)=> {

    const dispatch = useDispatch();
    return (
        <div className="main-modal">
            <div style={{
                paddingRight: 25,
                paddingLeft: 25
            }}>
                <div style={{
                    textAlign: 'center',
                    fontSize: 17,
                    fontWeight: 'bold'
                }}> {title}</div>
                <div style={{
                    marginTop: 20,
                    color: 'gray',
                    marginBottom: 20,
                    textAlign: 'center'
                }}>{mainText}</div>
            </div>

            <div onClick={()=>{
                dispatch({type:'SET_MODAL_VIEW', payload:{
                    modal_title:'',
                    modal_main_text:'',
                    modal_view:false,
                }})
            }} className='button-modal'>
                Fermer
            </div>
        </div>
    )
}

export default ModalView;
