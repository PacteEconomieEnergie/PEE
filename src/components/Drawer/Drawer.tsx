import React from "react";
import { Link } from 'react-router-dom';


export default function Drawer(props: {children: React.ReactNode, isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  

    const closeDrawer = () => {
        props.setIsOpen(false);
      };

  return (
     
    <main
      className={
        'fixed overflow-hidden z-40 bg-gray-900 bg-opacity-50 inset-0 transform ease-in-out mx-0' +
        (props.isOpen
          ? ' transition-opacity opacity-100 duration-300 translate-x-0'
          : ' transition-all delay-300 opacity-0 -translate-x-full')
      }
    >
      <section
        className={
          'left-0 absolute bg-gray-200 h-full shadow-xl duration-300 ease-in-out transition-all transform' +
          (props.isOpen ? ' translate-x-0' : ' -translate-x-full')
        }
      >
        <nav className="relative pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="flex justify-between p-4 font-bold text-lg">
            <button onClick={() => props.setIsOpen(false)} className="fixed right-[1rem] ">
              <img src="/assets/icons/close.svg" alt="close sidebar" />
            </button>
          </header>
          <div className="flex items-center justify-center mb-8">
            <Link to="/home">
              <img src="/images/logoPee.png" alt="Company Logo" className="h-28 w-auto cursor-pointer" />
            </Link>
          </div>
          {React.Children.map(props.children, (child) =>
            React.cloneElement(child as React.ReactElement<any>, { onClick: closeDrawer })
          )}
        </nav>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={() => {
          props.setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
