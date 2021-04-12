// class App extends React.Component {
//     constructor(props){
//       super()
//       this.state = {
//         ...props
//       }
//     }
  
//     pickBody = () => {
//       switch (this.state.menu){
//         case "Login":
//           return <Login/>
//         case "Main Menu":
//           return <Main/>
//         case "Create Account":
//           return <CreateAccount/>
//         default:
//           return <Login/>
//       }
//     }
  
//     render(){
//       return (
//         <div id="div-main">
//             <Head/>
//         </div>
//       )
//     }
//   }
  
//   const mapStateToProps = (state) => {
//     return {
//         menu: state.menu,
//         subMenu: state.subMenu
//     }
//   }
  
//   export default connect(mapStateToProps, {})(App)