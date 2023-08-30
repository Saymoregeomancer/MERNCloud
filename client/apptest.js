// import "./App.module.scss";
// import {
//   NavigationsLayout,
//   MainLayout,
//   SideBarLayout,
//   Menu,
// } from "./view/layouts";
// import Navigation from "./components/Navigation/Navigation";
// import { Search } from "./components";
// import ViewSwitcher from "./components/ui/viewSwitcher/ViewSwitcher";
// import Button from "./components/ui/button/Button";
// import LastDocument from "./components/LastDocument/LastDocument";
// import Table from "./components/Table/Table";
// import Profile from "./components/Profile/Profile";
// import Preview from "./components/Preview/Preview";
// import DrugAndDrop from "./components/DrugAndDrop/DrugAndDrop";
// import AppRouter from "./AppRouter/AppRouter";
// import FolderNavigation from "./components/FolderNavigation/FolderNavigation";

// function App() {
//   return (
//     <div className="flex justify-between  py-3 px-2 h-full">
//       <AppRouter />
//       <NavigationsLayout>
//         <Navigation />
//       </NavigationsLayout>

//       <MainLayout>
//         <Search />
//         <Menu
//           left={
//             <>
//               {/* <div className="w-28 mx-1">
//                 <Button contained>1</Button>
//               </div>

//               <div className="w-28 mx-1">
//                 <Button>2</Button>
//               </div>
//               <div className="w-28 mx-1">
//                 <Button>3</Button>
//               </div> */}
//               <FolderNavigation/>
//             </>
//           }
//           right={<ViewSwitcher />}
//         />
//         <LastDocument />
//         <Table />
//       </MainLayout>
//       <SideBarLayout>
//         <Profile />
//         <Preview />
//         <DrugAndDrop />
//       </SideBarLayout>
//     </div>
//   );
// }

// export default App;

// export async function fetchWithAuth(url, options) {

//   const loginUrl = '/login'; // url страницы для авторизации
//   let tokenData = null; // объявляем локальную переменную tokenData

//   if (sessionStorage.authToken) { // если в sessionStorage присутствует tokenData, то берем её
//       tokenData = JSON.parse(localStorage.tokenData);
//   } else {
//      return window.location.replace(loginUrl); // если токен отсутствует, то перенаправляем пользователя на страницу авторизации
//   }

//   if (!options.headers) { // если в запросе отсутствует headers, то задаем их
//       options.headers = {};
//   }

//   if (tokenData) {
//       if (Date.now() >= tokenData.expires_on * 1000) { // проверяем не истек ли срок жизни токена
//           try {
//               const newToken = await refreshToken(tokenData.refresh_token); // если истек, то обновляем токен с помощью refresh_token
//               saveToken(newToken);
//           } catch () { // если тут что-то пошло не так, то перенаправляем пользователя на страницу авторизации
//              return  window.location.replace(loginUrl);
//           }
//       }

//       options.headers.Authorization = `Bearer ${tokenData.token}`; // добавляем токен в headers запроса
//   }

//   return fetch(url, options); // возвращаем изначальную функцию, но уже с валидным токеном в headers
// }

{
  /* <div className={styles.cell}>
<div className={styles.check}>
  <CheckBox />
</div>
<div className={styles.icon}>
  <File size={23} />
</div>
<div className={styles.name}>Photo</div>
<div className={styles.favorite}>
  <Favorite size={18} />
</div>
<div className={styles.size}>1.01Gb</div>
<div className={styles.members}>Only u</div>
<div className={styles.actions}>
  <HiOutlineDotsVertical size={20} />
</div>
</div>
<div className={styles.cell}>
<div className={styles.check}>
  <CheckBox />
</div>
<div className={styles.icon}>
  <File size={23} />
</div>
<div className={styles.name}>Photo</div>
<div className={styles.favorite}>
  <Favorite size={18} isActive />
</div>
<div className={styles.size}>1.01Gb</div>
<div className={styles.members}>Only u</div>
<div className={styles.actions}>
  <HiOutlineDotsVertical size={20} />
</div>
</div>
<div className={styles.cell}>
<div className={styles.check}>
  <CheckBox />
</div>
<div className={styles.icon}>
  <File size={23} />
</div>
<div className={styles.name}>Photo</div>
<div className={styles.favorite}>
  <Favorite size={18} />
</div>
<div className={styles.size}>1.01Gb</div>
<div className={styles.members}>Only u</div>
<div className={styles.actions}>
  <HiOutlineDotsVertical size={20} />
</div>
</div> */
}

const str = "/folder/photo/pamezan/pizza/tur/mobik";

const splitStr = (str) => {
  let split = str.split("/");
  split.shift();
  return split;
};



console.log(splitStr(str));
