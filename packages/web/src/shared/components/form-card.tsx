import { BiCog } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { type Survey } from '@prisma/client'
import { Button } from './button'

interface Props {
  survey: Survey
}

export const FormCard = ({ survey }: Props) => {
  return (
    <div className="mt-4 cursor-pointer rounded-md border p-4 transition hover:opacity-100 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p>{survey.name}</p>
        </div>
        <Link to={`/survey/${survey.id}`}>
          <Button StartIcon={BiCog} color="secondary">
            Configurar
          </Button>
        </Link>
      </div>
    </div>
  )
}
