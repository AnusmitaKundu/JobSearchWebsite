import React from 'react'

function Alert(props) {
  return (
    // this line is for null condition , this is type of a if else statement i.e if props.alert == Null then the entire div portion will not executed but else props.alert != Null then the div portion will executed
    props.alert && 
    <div>
      <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{props.alert.type} : {props.alert.msg} </strong>
        {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
      </div>
    </div>
  )
}
export default Alert
