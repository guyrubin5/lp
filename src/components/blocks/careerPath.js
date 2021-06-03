import { React, styled, mq, http } from 'x'
import { forwardRef, useState, useRef, useEffect } from 'react'
import { ButtonYellow, Content, H4 } from 'components/common'
import { Loader } from 'components'

import { useBoundingClientRect } from 'hooks/useBoundingClientRect'

import ArrowHead from 'static/svg/arrowhead.svg'
import Arrow from 'static/svg/arrow.svg'

const ROLES = ['entry', 'medium', 'advanced']
const CIRCLE_RADIUS = 13
const CIRCLE_BORDER_SIZE = 3
const COLUMN_BORDER_SIZE = 1

const colors = {
  entry: {
    border: '#BEBF39',
    fill: '#F9F9F9',
  },
  medium: {
    border: '#A0D3F9',
    fill: '#F9F9F9',
  },
  advanced: {
    border: '#BDB3C8',
    fill: '#F9F9F9',
  },
}

const labels = {
  entry: 'entry-level',
  medium: 'mid-level',
  advanced: 'advanced',
}

const Title = styled.div`
  margin-top: 9px;
  font-weight: 600;
  text-align: center;
  font-size: 14px;
  color: #2a2d58;
`

const Role = do {
  const Wrapper = styled.div`
    padding: 10px;
    //border: 1px solid rgba(0, 0, 0, .2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    opacity: ${(props) => (props.isRelated ? 1 : 0.33)};
  `

  const Circle = styled.div`
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    width: ${CIRCLE_RADIUS * 2}px;
    height: ${CIRCLE_RADIUS * 2}px;
    border-radius: 1000px;
    position: relative;

    transition: all 0.37s ease-in;

    background: ${(props) =>
      props.isSelected ? colors[props.level].border : colors[props.level].fill};

    border: ${CIRCLE_BORDER_SIZE}px solid
      ${(props) => colors[props.level].border};
  `

  const StyledTitle = styled(Title)`
    line-height: 16px;
    min-height: 48px;
  `

  {
    forwardRef((props, ref) => {
      const { role } = props

      const el = 'div'
      if (props.titleElement && props.titleElement !== 'default') {
        el = props.titleElement
      }

      return (
        <Wrapper onClick={props.onClick} isRelated={role.isRelated}>
          <Circle ref={ref} level={role.level} isSelected={role.isSelected} />
          <StyledTitle as={el}>
            {props.title ? props.title : 'title'}
          </StyledTitle>
        </Wrapper>
      )
    })
  }
}

const RoleType = styled.div`
  text-transform: uppercase;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  position: relative;
  padding-left: 13px;
  display: inline-block;
  color: #2a2d58;

  &::before {
    position: absolute;
    content: '';
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 9px;
    height: 9px;
    background-color: ${(props) => props.color};
    border-radius: 9px;
  }
`

const Column = do {
  const Inner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    padding-top: 20px;
  `

  const Wrapper = styled.div`
    width: 33%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:not(:last-child) ${Inner} {
      border-right: ${COLUMN_BORDER_SIZE}px solid #dddddd;
    }
  `

  const Centered = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  `

  {
    forwardRef((props, ref) => {
      const { name } = props
      return (
        <Wrapper ref={ref}>
          <Centered>
            <RoleType color={colors[name].border}>{labels[name]}</RoleType>
          </Centered>
          <Inner>{props.children}</Inner>
        </Wrapper>
      )
    })
  }
}

const PathWrapper = styled.div`
  position: relative;
`

const Wrapper = styled.div`
  display: flex;
`

const Lines = do {
  const Canvas = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
  `

  const Horizontal = styled.div.attrs((props) => ({
    style: {
      top: props.top,
      left: props.left,
      opacity: props.opacity,
      ...(props.right && { right: props.right }),
      ...(props.width && { width: props.width }),
    },
  }))`
    background-color: ${(props) => (props.bg ? props.bg : '#2A2D58')};
    height: 1px;
    position: absolute;

    transition: all 0.37s ease-in;

    svg {
      position: absolute;
      right: -2px;
      top: 1px;
      transform: translateY(-50%);
    }
  `

  const Vertical = styled.div`
    background-color: ${(props) => (props.bg ? props.bg : '#2A2D58')};
    width: 1px;
    position: absolute;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
    ${(props) => (props.bottom ? `bottom: ${props.bottom}px;` : '')}
    ${(props) =>
      props.height
        ? `height: ${props.height}px;`
        : ''}

    transition: all .37s ease-in;
  `

  {
    forwardRef((props, ref) => {
      if (!props.rects || !props.rects.container) {
        return <Canvas ref={ref} />
      }

      const { rects, roles } = props

      const relativeToCanvas = ({ top, left }) => ({
        top: top - (rects?.canvas?.top ?? 0),
        left: left - (rects?.canvas?.left ?? 0),
      })

      const leftLine = roles.reduce(
        (out, role, index) => {
          if (role.col === 0 && !role.hasRight) {
            return out
          }

          if (role.col === 1 && !role.hasLeft) {
            return out
          }

          if (role.col === 2) {
            return out
          }

          const c = rects.circles[role.index]
          const y =
            relativeToCanvas({ top: c.top }).top +
            CIRCLE_RADIUS -
            CIRCLE_BORDER_SIZE

          return Object.assign(out, {
            start: Math.min(out.start, y),
            stop: Math.max(out.stop, y),
          })
        },
        { start: Infinity, stop: 0 }
      )

      const rightLine = roles.reduce(
        (out, role, index) => {
          if (role.col === 1 && !role.hasRight) {
            return out
          }

          if (role.col === 2 && !role.hasLeft) {
            return out
          }

          if (role.col === 0) {
            return out
          }

          const c = rects.circles[role.index]
          const y =
            relativeToCanvas({ top: c.top }).top +
            CIRCLE_RADIUS -
            CIRCLE_BORDER_SIZE

          return Object.assign(out, {
            start: Math.min(out.start, y),
            stop: Math.max(out.stop, y),
          })
        },
        { start: Infinity, stop: 0 }
      )

      return (
        <Canvas ref={ref}>
          {roles.map((role, index) => {
            const c = rects.circles[index]

            const top =
              relativeToCanvas({ top: c.top }).top +
              CIRCLE_RADIUS -
              CIRCLE_BORDER_SIZE

            const left = role.col > 0 ? rects.columns[role.col - 1].right : 0
            const right =
              rects.container.width -
              relativeToCanvas({ left: c.left }).left +
              rects.columns[role.col].width / 8
            const pinkRight =
              rects.container.width -
              (relativeToCanvas({ left: rects.columns[role.col].left }).left +
                rects.columns[role.col].width)

            return (
              <React.Fragment key={index}>
                <Horizontal
                  // bg={ 'blue' }
                  top={top}
                  left={relativeToCanvas({ left }).left - COLUMN_BORDER_SIZE}
                  right={right}
                  opacity={role.hasLeft ? 1 : 0}
                >
                  <ArrowHead />
                </Horizontal>
                <Horizontal
                  top={top}
                  left={
                    relativeToCanvas({ left: c.left }).left +
                    c.width +
                    rects.columns[role.col].width / 8
                  }
                  right={pinkRight}
                  opacity={role.hasRight ? 1 : 0}
                />
              </React.Fragment>
            )
          })}
          <Vertical
            opacity={leftLine.start !== Infinity && leftLine.stop !== 0 ? 1 : 0}
            top={leftLine.start === Infinity ? 0 : leftLine.start}
            bottom={
              leftLine.start === Infinity
                ? rects.canvas.height
                : rects.canvas.height - leftLine.stop
            }
            left={
              relativeToCanvas({ left: rects.columns[0].left }).left +
              rects.columns[0].width -
              COLUMN_BORDER_SIZE
            }
          />
          <Vertical
            opacity={rightLine.start !== Infinity && rightLine.stop ? 1 : 0}
            top={rightLine.start === Infinity ? 0 : rightLine.start}
            bottom={
              rightLine.start === Infinity
                ? rects.canvas.height
                : rects.canvas.height - rightLine.stop
            }
            left={
              relativeToCanvas({ left: rects.columns[1].left }).left +
              rects.columns[1].width -
              COLUMN_BORDER_SIZE
            }
          />
          {false &&
            ROLES.map((name, col) => {
              if (col === 0) {
                return null
              }

              const boundaries = roles.reduce(
                (out, role, index) => {
                  if (role.col !== col || !role.hasLeft) {
                    return out
                  }

                  const c = rects.circles[role.index]
                  const y = c.top + CIRCLE_RADIUS - CIRCLE_BORDER_SIZE

                  return Object.assign(out, {
                    start: Math.min(out.start, y),
                    stop: Math.max(out.stop, y),
                  })
                },
                { start: Infinity, stop: 0 }
              )

              return (
                <Vertical
                  key={col}
                  top={boundaries.start}
                  bottom={rects.container.height - boundaries.stop}
                  left={rects.columns[col - 1].right}
                />
              )
            })}
        </Canvas>
      )
    })
  }
}

const Salary = do {
  const shortFormatCurrency = (lang, number, currency) =>
    (
      new Intl.NumberFormat(lang, {
        style: 'currency',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        currency,
      }).format(number / 1000) + 'k'
    ).replace(/\.,]0(k)$/, '$1')

  const Wrapper = styled.span`
    color: #e7bd77;
    font-weight: bold;
  `

  {
    ;(props) => {
      const { average, post } = props
      const { Low, High } = average
      return (
        <Wrapper>
          {Low && High
            ? shortFormatCurrency(
                post.language.hreflang,
                Low,
                post.language.currency
              ) +
              ' - ' +
              shortFormatCurrency(
                post.language.hreflang,
                High,
                post.language.currency
              )
            : shortFormatCurrency(
                post.language.hreflang,
                average,
                post.language.currency
              )}
        </Wrapper>
      )
    }
  }
}

const Selected = do {
  const Container = styled.div`
    margin: 30px 0;
    padding: 22px 0;
    position: relative;
    //max-width: 500px;

    &::before {
      content: '';
      border-top: 1px solid #e9eaee;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    &::after {
      content: '';
      border-top: 1px solid #e9eaee;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `

  const StyledTitle = styled(Title)`
    text-align: left;
    margin-top: 10px;
    font-size: 18px;
  `

  const Content = styled.div`
    font-size: 16px;
    font-weight: normal;
    color: #2a2d58;

    > small {
      font-size: 14px;
    }

    a {
      color: #e7bd77;
      text-decoration: none;
      font-weight: 600;

      &:hover {
        color: #e7a746;
      }
    }

    ul {
      list-style: none;
      padding-left: 40px;

      li {
        line-height: 30px;
        position: relative;

        &::before {
          content: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE3Ljg4MyIgdmlld0JveD0iMCAwIDIzLjk1MyAxNy44ODMiIHdpZHRoPSIyMy45NTMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTM2Mi4zODUgNDMzLjA4YTEzLjM1NiAxMy4zNTYgMCAwIDEgLS45NSAxLjM1M2MtNC4wOCA0LjU4Ny04LjE4OCA5LjE1LTEyLjI2MSAxMy43NDQtMS4yIDEuMzQ5LTIuNDMgMS42NTQtMy44NzcuNDM2LTEuOTY2LTEuNjU2LTMuOTU2LTMuMjg1LTUuODg2LTQuOTgxLS41ODUtLjUxNC0xLjQzLTEuMTE3LS42ODktMi4wNzhhMS43IDEuNyAwIDAgMSAyLjI2MS0uNGMxLjQwOC43MDYgMi44IDEuNDUxIDQuMTM3IDIuMjkgMS4zLjgxNyAyLjE5My41NTMgMy4yMzYtLjUzOSAzLjE1OC0zLjMwNiA2LjQzNS02LjUgOS42NS05Ljc1YTUuMzMyIDUuMzMyIDAgMCAxIDIuMjE4LTEuNTU2YzEuMTc2LS4zNCAxLjkxLjEzNSAyLjE2MSAxLjQ4MXoiIGZpbGw9IiNlN2JkNzciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMzguNDMyIC00MzEuNDk1KSIvPjwvc3ZnPg==);
          width: 24px;
          height: 18px;
          position: absolute;
          left: -40px;
          top: 50%;
          transform: translateY(-50%);
          display: block;

          path {
            stroke: #e7bd77;
            fill: #e7bd77;
          }
        }
      }
    }

    h2 {
      font-size: 18px;
      font-weight: 600;
      margin-top: 25px;
    }
  `

  {
    ;(props) => {
      const { role, post } = props

      if (!role) {
        return null
      }

      return (
        <Container>
          <H4 line={true}>Selected Role</H4>
          <RoleType color={colors[role.level].border}>
            {labels[role.level]}
          </RoleType>
          <StyledTitle>{role.label}</StyledTitle>
          <Content>
            <p>
              Earn an average salary of{' '}
              <Salary average={role.avgSalary} post={post} />
            </p>
            <div dangerouslySetInnerHTML={{ __html: role.content }} />
          </Content>
        </Container>
      )
    }
  }
}

const BorderedBox = styled.div`
  //border: 1px solid #707070;
  padding: 60px 0;
  background-color: #fff;
`

const Container = styled.div`
  margin: 40px 0;
  position: relative;
`

const StyledContent = styled(Content)`
  ${mq.below('sm')} {
    padding: 0 5%;
  }
`

const WYSIWYG = styled.div`
  color: ${(props) => props.theme.primary};
  line-height: 2;
`

const CareerPath = (props) => {
  const {
    data: { title, intro, outro, ctaLabel, ctaUrl },
    post,
    careerPath,
  } = props

  const [loading, setLoading] = useState(false)

  const [selected, setSelected] = useState(null)

  const isAnySelected = selected ? true : false

  const roles = ROLES.reduce((out, name, col) => {
    if (careerPath && careerPath[name]) {
      careerPath[name].forEach((role, index) => {
        const isSelected = selected === role.id

        Object.assign(role, {
          level: name,
          row: index,
          col: col,
          index: careerPath[name].indexOf(role),
          isSelected,
          isAnySelected,
        })
      })

      return out.push(...careerPath[name]), out
    }

    return []
  }, [])

  const selectedRole = selected ? roles.find((role) => role.isSelected) : null

  roles.forEach((role, index) => {
    if (!isAnySelected) {
      return Object.assign(role, {
        isRelated: true,
      })
    }

    const hasLeft = do {
      if (role.col === 0) false
      else if (selected === role.id) true
      else if (selectedRole.relationsTo.includes(role.id)) true
      else false
    }

    const hasRight = do {
      if (role.col === 2) false
      else if (selected === role.id) true
      else if (selectedRole.relationsFrom.includes(role.id)) true
      else false
    }

    const isRelated = hasLeft || hasRight

    Object.assign(role, {
      index,
      hasLeft,
      hasRight,
      isRelated,
    })
  })

  const refs = {
    container: useRef(),
    circles: roles.map((role) => useRef()),
    columns: ROLES.map((role) => useRef()),
    canvas: useRef(),
  }

  const [containerRect, containerUpdate] = useBoundingClientRect(refs.container)
  const [canvasRect, canvasUpdate] = useBoundingClientRect(refs.canvas)

  const updates = [containerUpdate, canvasUpdate]

  const rects = {
    container: containerRect,
    circles: refs.circles.map((ref) => {
      const [rect, update] = useBoundingClientRect(ref)
      updates.push(update)
      return rect
    }),
    columns: refs.columns.map((ref) => {
      const [rect, update] = useBoundingClientRect(ref)
      updates.push(update)
      return rect
    }),
    canvas: canvasRect,
  }

  useEffect(() => {
    let timeout
    const onResize = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        updates.forEach((update) => update())
      }, 200)
    }
    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <StyledContent>
      <BorderedBox>
        <H4 line={true}>{title}</H4>
        {intro && <WYSIWYG dangerouslySetInnerHTML={{ __html: intro }} />}
        <Container ref={refs.container}>
          <PathWrapper>
            <Wrapper>
              {ROLES.map((name, col) => (
                <Column
                  key={name}
                  name={name}
                  ref={refs.columns[col]}
                  numRows={careerPath[name].length}
                >
                  {careerPath[name].map((role, index) => (
                    <Role
                      key={role.id}
                      index={roles.indexOf(role)}
                      title={role.label}
                      level={'entry'}
                      rows={careerPath[name].length}
                      row={index}
                      ref={refs.circles[roles.indexOf(role)]}
                      onClick={() => setSelected(role.id)}
                      role={role}
                    />
                  ))}
                </Column>
              ))}
            </Wrapper>
            <Lines
              roles={roles}
              rect={rects.container}
              rects={rects}
              ref={refs.canvas}
            />
          </PathWrapper>
          <Selected role={selectedRole} post={props.post} />
        </Container>
        {outro && <WYSIWYG dangerouslySetInnerHTML={{ __html: outro }} />}
        {ctaUrl && ctaLabel && (
          <ButtonYellow to={ctaUrl}>
            {ctaLabel}
            <Arrow className="circle" />
          </ButtonYellow>
        )}
      </BorderedBox>
    </StyledContent>
  )
}

export default (props) => {
  const {
    data: { careerPath },
    post,
  } = props
  const [data, setData] = useState({})

  const getCareerPath = async (id) => {
    if (!id) {
      return
    }

    return await http.get(`careerpaths/${id}`)
  }

  useEffect(() => {
    getCareerPath(careerPath).then((data) => {
      data.entry = data.entry.map((role) => {
        role.id = role.roleID
        return role
      })
      data.medium = data.medium.map((role) => {
        role.id = role.roleID
        return role
      })
      data.advanced = data.advanced.map((role) => {
        role.id = role.roleID
        return role
      })
      setData(data)
    })
  }, [])

  return (
    <>
      {Object.keys(data).length > 0 ? (
        <CareerPath {...props} careerPath={data} />
      ) : (
        <Loader />
      )}
    </>
  )
}
