import React, { useEffect, useRef } from "react";
import useResizeAware from "react-resize-aware";
import PropTypes from "prop-types";
import NeoVis, {
  NEOVIS_ADVANCED_CONFIG,
  NEOVIS_DEFAULT_CONFIG,
  objectToTitleHtml
} from "neovis.js/dist/neovis.js";
import { Grid, Paper } from "@mui/material";

const NeoGraph = (props) => {
  const {
    width,
    height,
    containerId,
    backgroundColor,
    neo4jUri,
    neo4jUser,
    neo4jPassword,
    cypher
  } = props;

  const visRef = useRef();
  useEffect(() => {
    const config = {
      containerId: visRef.current.id,
      neo4j: {
          serverUrl: neo4jUri,
          serverUser: neo4jUser,
          serverPassword: neo4jPassword,
      },
      serverDatabase: "demo3",
      labels: {
        [NEOVIS_DEFAULT_CONFIG]: {
          label: "event",
          [NEOVIS_ADVANCED_CONFIG]: {
            function: {
              title: (node) => {
                return objectToTitleHtml(node, ["event", "weight"])
              },
              color: (node) => {
                if (node.labels.includes("Cause")) {
                  return "red";
                }
                else if (node.labels.includes("Result")) {
                  return "yellow";
                }
                else {
                  return "blue";
                }
              }
            }
          }
        }
      },
      relationships: {
        SYN: {
          [NEOVIS_ADVANCED_CONFIG]: {
            function: {
              title: (edge) => {return objectToTitleHtml(edge, undefined)}
            },
            static: {
              color: "green",
              arrows: "from, to",
              width: 5,
              font: {
                align: "top",
                size: 20,
              },
              label: "SYN"
            }
          }
        },
        CAUSE: {
          [NEOVIS_ADVANCED_CONFIG]: {
            function: {
              title: (edge) => {return objectToTitleHtml(edge, undefined)}
            },
            static: {
              color: "red",
              arrows: "to",
              width: 5,
              font: {
                align: "top",
                size: 20,
              },
              label: "CAUSE",
            }
          }
        }
      },
      initialCypher: cypher === "" ? "match p = (n) --> (m) return * limit 25" : cypher
      // initialCypher: "match (n) - [r] -> (m) return n, r, m limit 25"
    }
    const vis = new NeoVis(config);
    vis.render();
  }, [cypher, neo4jPassword, neo4jUri, neo4jUser]);

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{p: 2}}>
      <Paper elevation={3}>
        <div
          id={containerId}
          ref={visRef}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: `${backgroundColor}`
          }}
        />
      </Paper>
    </Grid>
  );
}

NeoGraph.defaultProps = {
  width: 600,
  height: 600,
  backgroundColor: "#d3d3d3",
};

NeoGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  containerId: PropTypes.string.isRequired,
  neo4jUri: PropTypes.string.isRequired,
  neo4jUser: PropTypes.string.isRequired,
  neo4jPassword: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};

const ResponsiveNeoGraph = (props) => {
  const [resizeListener, sizes] = useResizeAware();

  const side = Math.max(sizes.width, sizes.height) / 2;
  const neoGraphProps = { ...props, width: side, height: side };
  return (
    <div style={{ position: "relative" }}>
      {resizeListener}
      <NeoGraph {...neoGraphProps} />
    </div>
  );
};

ResponsiveNeoGraph.defaultProps = {
  backgroundColor: "#d3d3d3",
};

ResponsiveNeoGraph.propTypes = {
  containerId: PropTypes.string.isRequired,
  neo4jUri: PropTypes.string.isRequired,
  neo4jUser: PropTypes.string.isRequired,
  neo4jPassword: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};

export { NeoGraph, ResponsiveNeoGraph };