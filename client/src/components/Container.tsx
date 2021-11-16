export const Container = (props: React.PropsWithChildren<{}>) => (
  <main>
    <div className="max-w-7xl mx-auto pt-20 sm:px-6 lg:px-8">
      {props.children}
    </div>
  </main>
)