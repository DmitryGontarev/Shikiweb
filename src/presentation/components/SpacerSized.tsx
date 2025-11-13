/**
 * Блок отступа для списков экрана
 *
 * @param height высота отступа
 */
export const SpacerSized = ({height = 110}: {height?: string | number}) => {
  return(
      <div style={{
          height: height
      }}>

      </div>
  )
}