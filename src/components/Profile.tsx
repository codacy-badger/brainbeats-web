import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { BackendContext } from '../util/api';

const useStyles = makeStyles(() => ({
  header: {
    paddingLeft: 20,
    margin: 0,
  },
  scroll: {
    overflow: 'auto',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  card: {
    borderRadius: 10,
    display: 'inline-block',
    textAlign: 'center',
    width: 200,
    height: 200,
    textDecoration: 'none',
  },
  samplePicture: {
    width: 150,
    height: 150,
    borderRadius: '50%'
  },
  sampleTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const Profile: React.FC = () => {
  const api = React.useContext(BackendContext);

  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  // mock data
  const samples = [
    {
      'picture': 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS-By0yPUMOuSRY2S6yxiA8-k6bTgraIUqUqbNvKN4E4z7N75iuC4bWj3aDNi_5SCEzrYQx34iu&usqp=CAc',
      'title': 'guitar testing title'
    },
    {
      'picture': 'data:image/jpeg;base64,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',
      'title': 'guitar testing title'
    },
    {
      'picture': 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS-By0yPUMOuSRY2S6yxiA8-k6bTgraIUqUqbNvKN4E4z7N75iuC4bWj3aDNi_5SCEzrYQx34iu&usqp=CAc',
      'title': 'guitar testing title'
    },
    {
      'picture': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUXFxYVFRUVFRUVFRUVFRUXFxUXFRUYHSggGBolHRUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFy0dHR0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTc3Lf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAGBwMFAAIEAQj/xABREAABAgIDCQsJBAYKAgMAAAABAAIDBAUGEQchMTJxcnOxshIiIyQlNUFhgbPBEzM0UXSRocLRYoKjtBRSY2SDojZCQ1NlkqTD4fCE0hUmRP/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwAEBf/EACQRAQACAgMBAAICAwEAAAAAAAABAgMxITJBERIiQlETwfAE/9oADAMBAAIRAxEAPwBMwBvm5zdoJlTY3qW0DHZnN2gmXMm8oZY+2hSgXrU3gmZ/yuQwiut/mmZ/yuQqrV0S20gF4dqL7mHpMXRfOEJEb1vbrRfct9Ii6IbYSZOsjXYzpJt9B9d28C3PGpyNKQwoNr35lmf8rkMccGuBwrSjhvHHr+irQFbUeOBces6mo5NFps3LjbeJO00TU1MNoS9uMjiJ00T5UxGhQ/lKvgYrG22eo7qdMn8CzxVhSIvFcVPc4SGSbP4bB4rvpEXiq1CQnNDG7UhoeAJ9zmA5DqSFh4ArfE5bWIyudtspSAPsRO7KDUb1BHK8EfYiD8IqWTQ02cNIjelBVIC+UcUiLxQTPYzlzY45XnRMevKVsAsGE5TrWwXa5h5cfbyjB0cfUxP0tSHuPt4/AP7OZ1Q0+yFzX2rXSNwQZc4HJkvmv+MRyNXILua81y+a7bctUUVYcBSZrz59mZ8xTmrFgKTNevPszPmKfHst9KBYQvQvXBWSPyr45OltBD+DQgataO6EvUfL2f3TfgEB1tXnz3h0xouIuM7KdakgBRxcY5TrUsv0r0PHM3LU7oQ4tC0UPYCS25TqgDi0LRQ9gLj/APVqFsXpa1zbYTkKDka14GooLV8HSCZNp4GOzObtBMqONSWsvjszm7QTOjBbJuDU1IZriODh5/ylCiLq6Dg4eedkoSsVo0nbad2KzI7aKLrlg4xG0Y20JRBvYfW0n8R48EXXKvPx9GNpTv1ka7GlIC+g6vgPkoek+VyNJ0X0HXQRwULSfI5Nj0NwMrqSHFjnP1NVMFeSw4rlL9bUMmgps2biw4gdNE+VMRoS8uK+gHTRflTFYoeyp4F6eB/+QkM2bt/yQ130hgXLTQ5QktHN7MH6rrpDAU9GkKT43rshSFhYoT+nRedkOpIOAN6F0SlLx+Ao7qOOWoQ6ovcuQK8XjkKPKniynYY0o/Cco5NHocFJ4CgqcbfcjekReKDJwX3LnxLTokhhOU61uFq3Ccp1qRoXW5jEuPt47Ln1smvh5JPhyRtyNnG5U/YnP9pPMrmvtaEb0GXNByVLZrttyNHBB1zUclS2YdtyNWlz1hF4pL17HDszPmKddYReKS1ffSGaP5irY4JdQwyvSFkIKXcJpkkQfNEjiEDRhAdbWHCj+jBxKDmDxQTWnFd1Lg/nDpjRWxcY5TrXTIstt7FzRcZ2U613UX/W7F3205oTCHfTngsP6PC0bNkJROhepOprLIEMfYaP5Vx5ufiuMqq9i/8AdQSjm6CN993xQMujB0Lk2ngY7M5u0EzYpwJZQMdmc3aCZsU4E19w1A9XXzcPPOyhJFtdfNws47KElUk7dMfFhZh72Ii25V56Po27RQpOCxsHRW++NFRXcr87HzGbRUr9ZGuxtN4UIXQfNQtJ8hRbMnfISug+ahZ52SqY4/UbgYIghjibP4h/EI8FQgoh/wDxQs2Ifxog8EmXTU2adxUcn/xousJiNS9uKjk8aWLtBMMKPsn8DdNc4yOjnNUBdlIYCuOmecZHRzmqAuukcBVKNIcmm3nZCkDLjehfQEbpSAlRvQrSl6yI28chR5VZtlPsHXG7p6B4mKch1I6q1/SFudG7p6jfSlYOCkReKDppt93ajKkcBQfMm+e1Rx7UtojGYTl8VO0KGCL5yldIC6ZQiDLuRs4zK6Od24ITuISYuSN4zKaCdP40IJ1OauayqF3Qg25oeSpbNdtuRo4ILuZ81S2Y7bcjVpR1hF4pK1/HGGaP5indWDAUk7ofpDNGNoq1CXUMuF0taopIWruhwlryEHlIN4nCzAgOtmB2RH9H+hwcwJfVyeuOY/aFo0WEbGdlOtWVDNt3XZ4qujYzsp1q7q00WRCer337F23n5Vzxt2OhWGxOVw4Fma3UlHMWWgjpTcf5lmaNS4r8q0Ki6FjWfZQMje6EN/8Ad8SghdWDqTJtPAx2ZzdoJlOwpaQMdmc3WEy2m+ntH7QNNSoa7CxkLOdqCE0XV4xIWV2oISVZhOXXSBvQNCO+inxRRcs87HzGbTkM0kL0DQDvYqJrl3nI+azaco26mjY1jYUKXQRwULPOyiuNhQpdCHBws92yq06tcDBEJ9DhZkQ/jxfoh8IgeeJwtG/8zHU8uoGhr3Fhyc3SxdpMIBL+4sOTm6WLtphDApeyfwM01zhI5k5swV00gLxXPTnp8hmzexCXRSLrxT0aVBFGFICWG9Cf73XikFBFg7SPirWSexMU5Cjurn9IW9T4/dREBRTeOQ6kfUAf/sY0sx3URRspU36TwFB0wb5RfSp3pQVMOvu7VLHtSdErLdK6WLmluldDSr2Rqa1yVvGZXqlpw/6mGE6Ak1chvx5b2Sb/ADjAnLYoTtSYRPQTcz5qlcw7bkaROlBlzfmqV0fzOWjTIqwvsBSWr+bZhujG05OSsZvFJivfn2aMbRVMRLuGiBaTkVpCZYe0a1VUQ7fHrCtQf++9DJtq6OiS9EhZgS5riL6Y8jflIWY3UlzXTCueI/aFfvBaxsZ2U61dVdO9ifd8VSx8Z2Uq1oF2MM34Wrsv1c8bXnkLdz2e4JtnzLc0JUwrPp8E1yeBbkXFaVqlLdCx/u+JQQjW6D5w5viUFLqwdCZNpoGOzObtBMiEb6W8DHZnN2gmLAdfT23AV1Kprxiwsr/lQmiuu+LByv8AlQorSm6qQ/sdC3s38RFFy7zkxmw9bkKTp831Qmj+Zx8UVXMMeYzYet6jbqeuxrEO+QrdC83CznakTk30M3QsSFnO1BVp1CwHCvXeiQ9G/wDMRyqJXlvFmaN/fRVLL4ahu3F+bWaSNtlMEYEv7jHNrNJG7wpgDApeyfwM056fIZJvumKakzeKhp08fo//AMvumqWlDeKegSoIhwpDDB952tPl6QzunOftK8pNYptByFHlXDbWEaWZ7uIgJ2A5DqR3Vf8ApA3STHdxFC6tTfpfFKCI7sbtRtTB3pQLGdjdqlTak6J2UxT2KcKCWxT2eKmYV0ShU3LjY4eX6pOa+M6PonMk3cYHDQuqTmPjO/8ACcihO1XPGwHIUG3OeapXR/MUYRzeOQ6kIXPeapXRDWVq6Bw1kN4pMV3PDtzPmcnJWU4Umq7Hh26MbTlbHol3HROFWzBaqmicPZ9Fcw8I7VPJsaaOOjzxOFmBLmumHtTFo70OFmeJS9rqOmxQr2hTwtI2M7KVaUDhd2eKq42M7KVZ0CLSezWuu/VCNr+ECCmyXcC3IlQG2WJpwjxeHmhcV/7WoVF0E8Kc0ILRlX88Kc0INXVg6QTJtLBxm5zdYTBkiC5L6FjNzm6wjyjzfT22WunFXjBB+/8AKhRFleRvYOV/yoTVSJps32aNviiu5ljTGSHrehKZN9uY3xRZc1wzOSHreo36nrsYjChu6DiQs52oIiYb6HboPm4Wc7UFamgsCFdMvy7NG/vYipQriF5huY/vIillNTZxXGObWaSN3jkfdCAbjPNkPSRu8cj3oUvZP4Gae9Oo/LN9yFLSpvKKnvTaPyzXchSUpgKegSonJERfmftJ8EJERxtRNpdE6SRWdHrR7VK/TzT+0mu7cgSGb4yhHlTjbTo6nzJ97HBc91amxTOKUCxTjdqOaaO9KBYhxu1ToedFDKjen7vipWqOUxD93xW7V0WQqcVxdvDQ/ZIvxnSnEk7cU8832SJ+ccnEuedrOOZwHIdSD7nfNUro/EovmcV2Q6kIXO+apXR+JSxplbWc4Um65HjA0Y2nJxVo6Um64ekDMbtOXRj0ndBRQv8Av8FdQWi1U1Etv+/5VfSzb9ilmn9hx6NmRNkpCzfEoCrkd6f+9KO5U8UhZviUva4OvHKFCs/tCnhcRcY5SrirmF2QeKp4uMcpV1VrGdkGtdmTrKEbELmpky54vDzQl0QmCw2S7M0Lz7SvUqa+OtjOyBCSKK6utiu7ELruwdISydkkLGblGsI7os75AsMb5uUa0d0Q2+mttquSvGLByv1NQoi+vbN5BPW4e8D6IRCr4myPhGa3Ui25vhmMkLW9CUfCM1upFdzgb6YzYet6jfqpXYzgi+h26D5uFnO1IkgsvofujMshQj9sj3t/4Vcei3nkBhXEDzLM1/eRFTq3gngW5rtt6ll0amzjuM82Q9JG7xyPOhAVxnmxmkjd4Ue9Cl7J40Gqe9NkMs13IUlJ4Co6dHHqPyzfchS0oFXHBbKUhIaYG9bnRNsp9EYUiZxu8h/xT+K4eC6baS/pzwhfGUa0dVJNtO29cyfg5A8tjtzm6wjmoo5cy/pB94cuW/8ApWprU2d6UDv/AK3ajim270oNELG7VPFCltE7KDeOys8VsCsk28E8+ow/ju/ovV0W8Qg4biQ4Vvsj/jOPTjScuI+eA/dIn5xycli5/VZcEzgdkOpB9zvmqV0fzFGUwN67IdSELno5KlNENZQjQqms3Sk5XH0j7jdbk5qzNwpM1x9J+43W5dFNJX20oVot/wA3yfVXUG+qahujK7/bV5Lt/wC9ijm7Hx6M+Vcf0SEfs+JS6rY/DlGtMaVbxOFm+JS3raw7olQp3hSdSAomMcpVzV3C7INap4mMcpVxVsb45PFdmTpLnjYkDrcKYNlsuzNCXocEwoBtl4eaF51nRUpa6iyK4ZEMIorw3hn9moIXsXfh6Qjk7OiC3ftH2mj4hNiRokgYFyQrl0Ty7SIsMNYYURwscbQXutDbcGJ8Uz2Ucz1Jp3EtBV12o1zoDbBbuXWnqtBCAXScQf2b/wDI76L6VfRMNwIIvG8UHmo04LQ2NAItNm6EQGy29bYLLbFS2TiIiCRTnZJuBOEWEWAg3jg6Qja5PA3cSYH2Ye05EESokxMTEWBEdB4GHCNo3YBMfdndA2W2jydlhvX0RXPqhRKPfGdFiMieUDA3cBw3O5LibbcNu6HuUp5g8cS9NHEdCFroUvuoDR07q0dZFgve9N4SbT0KgrZVF8y2H5F7WRIb92C63ckbktLSADaDaqVvFY19Lav5PnmJLRG4Ybx0C1jhaeq8uyWicE4G8W3rDeN+/wCKYM5VebfSUOTc6DumS5mgQ5+4sL/JfqW222dHarSk7nM3GaWl8vfvB26iAj+S+OpStP5eHrws7i45NbpY22UwNzeQ9c/q4+Qk2y8RzXvDnuLmW7nfutFlotwInDUv48t9ClOt49R+Wb7gLvnZUkKKnmcfo69/Wmh/pz9Ff+QCpXiAkETEuW2pDR2OdDhNaxziBExWud/bP9QX1THo5jrxCXsjc6moAeyHEglpiPe3dGICGuNoBsab/X1p5y8aLFOdkk2Xiwy17oMQAEHfQ3tF424SEX3OLTTMM/Yik9rCfFE9eqtzcvIxYjzBO+hN3rn27+K1ovFoGEq+qlc4jS1IfpsWJCLfJuZuGbu0OLWtttLRaN78VHmeZhTXAonpPdBCNIUc5m6vetMwwAoI9HMeCCMKNP1aZ+vkiRvQIl4m10OywE4N2Tg6lsZWJZb5KLZ6/Jvs99iak9c4mJCSnHB8B7AyLEDgYjXhjRaABuSCbB60TuqXN7kb6BgH9aJ/6I3vPkFrWP7DdxKOHzTtyCA2U3F+9aRHG6PvJTnQZU+qUaVmoszFfDcHwmwmtZur25eXEkkDDajVSiDzLjjC8ch1IVucw+SpTRDWUZRId45DqQzc0h8lSehb4pojiS/eXBT9HFwN5IivMItmyD+o3W5fVESTBwhLCvdy2NNzjZiA6CIfk2teyI97HFzXPN4tY4WEOHuT1n4E8kzJRywgBrnWBxO5BNgdZfvZqvGTQs3YY8t9bWPPhYmdKVFnmAMayTa0XrBGjG918DfQzVKqk5FdOysKLCZ5CO6EXnduINpt8ne9QvE+5JaJvz8NX9ePo6ouScZOCHNLXGGHFpwtLt9uTkts7EKVnoBzmusF+y0ZQm0yUAaB6gB7go4lHMdeIU4pET9H8uHyNGZv3D1OI+K7aKiRGvBZDe/oO5a52G/0BN6euPOdNRY7Y0Mw3vc9sNzX3t0bbCQb/SpJao8yyZfAbFghvk4ca8x9gL3RGbkNtH91b2q1r8fIgkQATFcBaYUU+oCG+0/C8m3JUa4QITHjfBjA4D9bcjdD32qShanRIUYRIsSHEaAdy0McCH2ix1pccAt96Kf0ULm/xzPiv5RBC3TaHcweWsvXgT122BLoBfU9aarsnJaLAtDS9tgdZbuXAgg2dN8JFVuqO6j4zYJjMibqGIm63DmWWue2yzdH9TD1rox/K1+Snb9p4POGeEfmQtqKuoFcbDwr8yHtRV0gpvvEM6WFTsK5YZXQwrAqpE8ozY/YSR/mmh4K7VHJ84zPs0n3k4rtHyGbMU4XO0qdpWaQpFHL7D66NcPdNtRa1Cczz5C66Pij3TLEVhBkgW4UQKkCLKCsB49Rukmh/pX/AERFahmsh49RemmfycVEoW8Z6VgWpK9CDBO6wOTYg/ayv5mEjAdOVB11oW0ZE0st+ZhIxR8D1ixeErxKZS17FtGzvs0fu3K3OAKorweTZ32aP3blbHAFp0zcLYLQLYIMyJinIdSHLmnNUnoGakQxzvHZrtRQ9c25rk9BD1JvA9EpWpK9K0KAvQgS536XSx/fog9yOggK5s62ZpY/4hG1owA7K0BWxK0CnIt1VWcdf7PBH4kwrQKsb6XEP7KCP5op8UWWC1XpWqMA2SPu4xrJ6EP3Znexk7rUg7vj+UYXs0PvYy3z6ek8mu3zjsxm1E+q6QuNp4U6Nvwc76rraVq6gPXRDKmaVzsUrSmBXSvOUx1ysp8Is2rwqigHlGN1ykt8I0z9Vd2o+QHrAVPDK5lPDKDBqc57lz65GMPdHhlFVqFKRPLMr7HMd7DKKkfG9bhSBRBbgoMHqy+mUXp5j8nGRIhitJ43RZ/eI3xlIqJbVvGbFehakrGrMFbrPNkTSy35mEjC1Bt1o8lxdLLfmYSMCUfA9YSvLV4V4ClMqq5C2j5z2eN3blaDAFVVx5vm/Z42wVaNwBZkiy1a2r21Bmk4eDiZj9kqiucHkuT0EPZCuqQdwMXRxNgqkuc82Segh7ITRoPRI5aWr1xWlqUWzUAXL/O0qf8AEZnaCPm4UAXLPOUmfXSMzrCaAHpWgK9coyb6nMimtVXD9Ki5kIfBx8VYgqtgnjUbJDH8g+qaGWK0JWErQlaGbAr5/u+O5SZ7ND24qf1q+fbvBtpIezwtp6auwk2geG/h6n/8rsYV6sS11BpTNKkYVixOCvhc4P65SD8I0b6q6tWLEI6x/wB6E7a2qZhWLFhDNKu5Zk/ZZnbYioFYsR8gPWzSpAV4sQYN1sPGaM9qifGViomtWLFo0zCV60rFiAhK64eSo2klvzENGFqxYm/iHrwleLFiQVZWz0Ga0EXYKsmYAsWIs9JWWrFiVnPTDrJeOf2MXu3KoueHkyT9nhbAWLE8aCdiAlagrFiUWzMIS9uUOv0kf8QmNbVixMA+KjdhWLFKRehyrYB4zHyw+6Z9VixNRneStCV4sRlmWr59u5u5T/gwvmPisWI120v/2Q==',
      'title': 'guitar testing title'
    },
    {
      'picture': 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS-By0yPUMOuSRY2S6yxiA8-k6bTgraIUqUqbNvKN4E4z7N75iuC4bWj3aDNi_5SCEzrYQx34iu&usqp=CAc',
      'title': 'guitar testing title'
    },
    {
      'picture': 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS-By0yPUMOuSRY2S6yxiA8-k6bTgraIUqUqbNvKN4E4z7N75iuC4bWj3aDNi_5SCEzrYQx34iu&usqp=CAc',
      'title': 'guitar testing title'
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return (<div>loading...</div>);
  
  return (
    <div style={{color: 'white'}}>
      <div className={classes.header}>
        <div>
          <span style={{marginRight: 10}}>Public Samples</span>
          <input type="text" placeholder="Search.."></input>
        </div>
        <hr></hr>
      </div>
      <div className={classes.scroll}>
        {samples.map((sample, key) => {
          return (
            <div className={classes.card} key={key}>
              <img className={classes.samplePicture} src={sample.picture}></img>
              <div className={classes.sampleTitle}>{sample.title}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default Profile;