import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Corousel from './Corousel';


const useStyles = makeStyles(()=>({
    banner: {
        backgroundImage: "url(./banner.jpeg)"
    },
    content: {
        height: 400,
        paddingTop:20,
        justifyContent: "space-around",
        display: "flex",
        flexDirection:"column"
    },
    heading: {
        height:"40%",
        textAlign: "center",
        justifyContent: "center",
        fontWeight: "bold",
        marginBottom:15,
        display:"flex",
        flexDirection:"column"
    },
    corousel: {
        display:"flex"
    }
}))


const Banner = () => {

    const classes = useStyles();

  return (
    <div className={classes.banner}>
        <Container className={classes.content}>
            <div>
                <Typography variant="h2" className={classes.heading}>
                    Crypto
                </Typography>
            </div>
            <Corousel/>

        </Container>
    </div>
  )
}

export default Banner