import NewHeader from '~/components/newHeader/NewHeader'
import { Sport } from '~/config/types'

type PropsType = React.PropsWithChildren<{ sports: Sport[] }>

const SimpleLayout = ({ sports, children }: PropsType) => (
  <>
    <NewHeader sports={sports} />
    {children}
  </>
)

export default SimpleLayout
