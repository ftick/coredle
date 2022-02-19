import {
  HOW_TO1_TEXT,
  HOW_TO2_TEXT,
  HOW_TO3_TEXT,
  HOW_TO4_TEXT,
  HOW_TO5_TEXT,
  HOW_TO6_TEXT,
} from '../../constants/strings'
import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">{HOW_TO1_TEXT}</p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="M" status="correct" />
        <Cell value="A" />
        <Cell value="R" />
        <Cell value="I" />
        <Cell value="O" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">{HOW_TO2_TEXT}</p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="D" />
        <Cell value="A" />
        <Cell value="C" status="present" />
        <Cell value="U" />
        <Cell value="S" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">{HOW_TO3_TEXT}</p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="S" />
        <Cell value="H" />
        <Cell value="I" />
        <Cell value="N" status="absent" />
        <Cell value="E" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">{HOW_TO4_TEXT}</p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        {HOW_TO5_TEXT}{' '}
        <a
          href="https://github.com/ftick/smash-wordle"
          className="underline font-bold"
        >
          {HOW_TO6_TEXT}
        </a>{' '}
      </p>
    </BaseModal>
  )
}
