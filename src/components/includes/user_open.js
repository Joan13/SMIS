import React from 'react'

const UserOpen=()=> {

    const logout_session=()=> {
        // this.setState({ middle_func: 0, loading_middle: true });

        // if (this.props.middle_func === 0) {
        // this.setState({ redirectToReferrer: false, loading_middle: false });
        sessionStorage.removeItem("assemble_user_data");
        sessionStorage.setItem("classeYambiSMIS", []);
        sessionStorage.clear();
        // }
    }

  return (
    <div className="main-div-modal nodrag">
          {/* {ModalView(modal_view.modal_title, modal_view.modal_main_text)} */}
          
          <button onClick={() => logout_session()} className='nodrag bg-primary-100 rounded-xl text-text-20 py-3 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md '>
                                                    Deconnexion
                                                </button>
        </div>
  )
}

export default UserOpen;

