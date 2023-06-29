const getStyles = () => ({
  title: {
    fontSize: 50,
    textAlign: "center",
    padding: "15px",
    margin: "30px",
  },
});

const Title = () => {
  const styles = getStyles();

  return <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>;
};

export default Title;
