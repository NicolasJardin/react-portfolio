import { ReactComponent as CssIcon } from 'assets/icons/css.svg'
import { ReactComponent as GitIcon } from 'assets/icons/git.svg'
import { ReactComponent as HtmlIcon } from 'assets/icons/html.svg'
import { ReactComponent as JavascriptIcon } from 'assets/icons/javascript.svg'
import { ReactComponent as MaterialUiIcon } from 'assets/icons/material-ui.svg'
import { ReactComponent as ReactQueryIcon } from 'assets/icons/react-query.svg'
import { ReactComponent as ReactIcon } from 'assets/icons/react.svg'
import { ReactComponent as ReduxIcon } from 'assets/icons/redux.svg'
import { ReactComponent as SassIcon } from 'assets/icons/sass.svg'
import { ReactComponent as StyledComponentsIcon } from 'assets/icons/styled-components.svg'
import SkillContext from 'modules/skill/contexts/SkillContext'
import { PropsWithChildren, useCallback, useState } from 'react'
import useGetSkills from 'services/skill/queries/useGetSkills'
import { SkillTypeEnum } from 'types/enums/skill/SkillTypeEnum'
import { Skill } from 'types/interfaces/skill/Skill'

type SkillProviderProps = {}

export default function SkillProvider({
  children,
  ...props
}: PropsWithChildren<SkillProviderProps>) {
  const { data: skills } = useGetSkills()

  const [selectedSkill, setSelectedSkill] = useState<Skill>()
  const [skillIsFixed, setSkillIsFixed] = useState<boolean>(false)

  const selectSkill = useCallback(
    (index: number, fixed?: boolean) => {
      if (skillIsFixed && !fixed) return

      setSelectedSkill(skills?.[index])
      if (fixed) setSkillIsFixed(true)
    },
    [skills, skillIsFixed]
  )

  const clearSelectedSkill = useCallback(
    (clearFixed?: boolean) => {
      if (!skillIsFixed) return setSelectedSkill(undefined)

      if (clearFixed && skillIsFixed) {
        setSelectedSkill(undefined)
        setSkillIsFixed(false)
      }
    },
    [skillIsFixed]
  )

  const getSkillIcon = useCallback((skillType: SkillTypeEnum) => {
    switch (skillType) {
      case SkillTypeEnum.CSS:
        return <CssIcon />
      case SkillTypeEnum.GIT:
        return <GitIcon />
      case SkillTypeEnum.HTML:
        return <HtmlIcon />
      case SkillTypeEnum.JAVASCRIPT:
        return <JavascriptIcon />
      case SkillTypeEnum.MATERIAL_UI:
        return <MaterialUiIcon />
      case SkillTypeEnum.REACT:
        return <ReactIcon />
      case SkillTypeEnum.REACT_QUERY:
        return <ReactQueryIcon />
      case SkillTypeEnum.REDUX:
        return <ReduxIcon />
      case SkillTypeEnum.SASS:
        return <SassIcon />
    }

    return <StyledComponentsIcon />
  }, [])

  return (
    <SkillContext.Provider
      value={{ skills, selectSkill, selectedSkill, getSkillIcon, clearSelectedSkill, skillIsFixed }}
    >
      {children}
    </SkillContext.Provider>
  )
}
