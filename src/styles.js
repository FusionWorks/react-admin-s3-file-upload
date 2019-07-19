const styles = {
  wrapper: {
    position: 'relative',
    paddingBottom: '50px'
  },
  fileInput: {
    display: 'none'
  },
  labelFileInput: {
    margin: '0 25px 0 0',
    display: 'inline-block',
    backgroundColor: '#f5f5f5',
    padding: 0
  },
  zippedFiles : {
    padding: '3px 10px',
    display: 'inline-block',
    backgroundColor: '#f5f5f5',
  },
  addedFiles: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '600px',
    alignItems: 'stretch',
    listStyle: 'none',
    marginLeft: '-40px',
  },
  fileItem: {
    display: 'flex',
    alignItems: 'center',
    border: '2px dashed #f5f5f5',
    padding: '10px',
    borderRadius: '3px',
    margin: '10px 0',
    position: 'relative'
  },
  fileLink: {
    display: 'flex',
    color: '#888',
    justifyContent: 'start',
    alignItems: 'center',
    textDecoration: 'none',
    width: 'calc(100% - 100px)'
  },
  fileImg: {
    width: '150px',
    height: '100px',
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    margin: '0 20px 0 0',
    borderRadius: '3px'
  },
  fileName: {
    maxWidth: 'calc(100% - 250px)',
    wordWrap: 'break-word'
  },
  rightBlock: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    padding: '10px 10px 10px 0',
    boxSizing: 'border-box'
  },
  download: {
    color: '#2BB656',
    fontFamily: 'Exo, sans-serif',
    fontWeight: 700,
    height: '20px',
  },
  delete: {
    color: 'rgb(225, 0, 80)',
    fontFamily: 'Exo, sans-serif',
    fontWeight: 700,
    height: '20px',
  },
  empty: {
    color: '#002D5A',
    fontSize: '0.875rem',
    fontWeight: 400,
    fontFamily: "'Open Sans', 'sans-serif'",
    lineHeight: 1,
    marginTop: '20px'
  },
  loadingWrapper: {
    position: 'relative',
    maxWidth: '600px',
  },
  percent: {
    fontSize: '16px',
    position:'absolute',
    left:0,
    right: 0,
    textAlign: 'center',
    top: '17px'
  },
  loading: {
    position: 'absolute',
    width : '50px',
    height: '50px',
    border: '2px solid transparent',
    borderLeft: '2px solid #84C5E7',
    borderRight: '2px solid #84C5E7',
    borderRadius: '50%',
    animation: 'rotate linear 1s infinite both',
    botom:0,
    left: '274px',
  },
  '@keyframes rotate': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  },
};

export default styles;