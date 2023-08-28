import { MenuItems } from "../../utils/types";

import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from 'usehooks-ts'

type NavMenuProps = {
  menuItems?: MenuItems
  isOpen?: boolean;
}

const animateUL = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const animateLI = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

const NavMenu = ({ menuItems = [], isOpen = false }: NavMenuProps) => {
  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <AnimatePresence>
      {(isOpen || matches) && (
        <motion.div
          className="items-center justify-between w-auto order-1 md:w-full md:absolute md:translate-y-8 md:left-0 md:top-1/2 md:bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.ul
          className="flex flex-row p-0 md:p-4 mt-0 font-medium md:flex-col space-x-8 md:space-x-0 md:mt-4"
          variants={animateUL}
          initial="hidden"
          animate="show"
          >
            {menuItems.map((item, index) =>
              <motion.li key={index} variants={animateLI}>
                <a href={item.link} className={"block p-0 bg-transparent md:py-2 md:pl-3 md:pr-4 " + (item.selected ? "text-black md:text-white pointer-events-none" : "text-gray md:text-gray pointer-events-auto hover:text-text-darker-gray")} aria-current={item.selected ? "page" : "false"}>{item.title}</a>
              </motion.li>
            )}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NavMenu;